FROM node:20-slim AS base

# Playwright deps para headless browser
RUN apt-get update && apt-get install -y \
    libnss3 libatk1.0-0 libatk-bridge2.0-0 libcups2 \
    libdrm2 libxkbcommon0 libxcomposite1 libxdamage1 \
    libxrandr2 libgbm1 libasound2 libpangocairo-1.0-0 \
    libgtk-3-0 \
    && rm -rf /var/lib/apt/lists/*

# pnpm
RUN corepack enable && corepack prepare pnpm@10 --activate

WORKDIR /app

# Copy workspace files
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json turbo.json ./
COPY packages/shared/package.json packages/shared/
COPY packages/db/package.json packages/db/
COPY packages/config-ts/package.json packages/config-ts/
COPY apps/workers/package.json apps/workers/

# Install deps
RUN pnpm install --frozen-lockfile

# Copy source
COPY packages/shared/ packages/shared/
COPY packages/db/ packages/db/
COPY packages/config-ts/ packages/config-ts/
COPY apps/workers/ apps/workers/

# Install playwright browsers
RUN npx playwright install chromium

WORKDIR /app/apps/workers

EXPOSE 3001

CMD ["pnpm", "start"]
