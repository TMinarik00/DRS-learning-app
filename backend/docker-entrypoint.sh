#!/bin/sh
set -e

PGDATA=/var/lib/postgresql/data
PGUSER_APP=drs_user
PGPASS_APP=drs_password
PGDB_APP=drs_db

# 1. Initialize Postgres data dir on first run
if [ ! -s "$PGDATA/PG_VERSION" ]; then
  echo "🗄️  Initializing PostgreSQL cluster..."
  chown -R postgres:postgres "$PGDATA"
  su-exec postgres initdb -D "$PGDATA" --username=postgres --auth-local=trust --auth-host=trust -E UTF8
  {
    echo "listen_addresses = 'localhost'"
    echo "unix_socket_directories = '/tmp'"
  } >> "$PGDATA/postgresql.conf"
fi

chown -R postgres:postgres "$PGDATA"

# 2. Start Postgres in background
echo "🚀 Starting PostgreSQL..."
su-exec postgres pg_ctl -D "$PGDATA" -l /tmp/pg.log -w -o "-h localhost -k /tmp" start

# Wait for socket on TCP localhost
for i in $(seq 1 30); do
  if su-exec postgres psql -h 127.0.0.1 -U postgres -d postgres -c "SELECT 1" >/dev/null 2>&1; then
    break
  fi
  sleep 1
done

# 3. Create app user/database if missing
PSQL="su-exec postgres psql -h 127.0.0.1 -U postgres -d postgres"
$PSQL -tAc "SELECT 1 FROM pg_roles WHERE rolname='$PGUSER_APP'" | grep -q 1 \
  || $PSQL -c "CREATE USER $PGUSER_APP WITH PASSWORD '$PGPASS_APP' SUPERUSER"

$PSQL -tAc "SELECT 1 FROM pg_database WHERE datname='$PGDB_APP'" | grep -q 1 \
  || $PSQL -c "CREATE DATABASE $PGDB_APP OWNER $PGUSER_APP"

# 4. Prisma migrate + seed
echo "🗄️  Pushing database schema..."
npx prisma db push --accept-data-loss

echo "🌱 Checking seed status..."
COUNT=$(node -e "
const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
p.question.count().then(c => { console.log(c); p.\$disconnect(); }).catch(() => { console.log(0); });
" 2>/dev/null || echo "0")

if [ "$COUNT" = "0" ]; then
  echo "🌱 Seeding database..."
  npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/seed.ts
else
  echo "✅ Database already seeded ($COUNT questions)"
fi

# 5. Run Node app in foreground; on exit, stop Postgres cleanly
trap 'echo "🛑 Stopping PostgreSQL..."; su-exec postgres pg_ctl -D "$PGDATA" -m fast stop || true' EXIT TERM INT

echo "🚀 Starting server..."
exec node dist/index.js
