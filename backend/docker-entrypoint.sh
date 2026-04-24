#!/bin/sh
set -e

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

echo "🚀 Starting server..."
exec node dist/index.js
