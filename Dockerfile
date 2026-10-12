# 1. Base stage with Node.js 22 Alpine and libc6-compat
FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate

# 2. Dependencies installation stage
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# 3. Build stage
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build-time environment variable defaults for prerendering
ENV DATABASE_URI="postgresql://postgres:postgres@localhost:5432/pronedb"
ENV PAYLOAD_SECRET="build-time-secret-key-32-chars-minimum-safe-placeholder"
ENV NEXT_PUBLIC_SITE_URL="https://prone.network"

RUN pnpm build

# 4. Production Runner stage
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public directory for static asset serving
COPY --from=builder /app/public ./public

# Prepare .next directory with proper non-root permissions
RUN mkdir .next && chown nextjs:nodejs .next

# Copy standalone build and static bundles
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:3000/api/health || exit 1

CMD ["node", "server.js"]
