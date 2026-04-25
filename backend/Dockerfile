FROM node:20-alpine AS builder
WORKDIR /app
RUN apk add --no-cache openssl libc6-compat
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:20-alpine
WORKDIR /app

# Install Postgres server + tools and Prisma deps
RUN apk add --no-cache postgresql16 postgresql16-client postgresql16-contrib openssl libc6-compat su-exec \
    && mkdir -p /run/postgresql /var/lib/postgresql/data \
    && chown -R postgres:postgres /run/postgresql /var/lib/postgresql

COPY package*.json ./
RUN npm ci
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY prisma ./prisma

COPY docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh

EXPOSE 3000 5432
ENTRYPOINT ["./docker-entrypoint.sh"]
