FROM node:18-alpine AS base

# Set pnpm version explicitly
ENV PNPM_VERSION=9.12.3

# Install dependencies first in a separate layer
FROM base AS deps
WORKDIR /app

# Install pnpm using a direct method - no caching for reliability
RUN npm install -g pnpm@${PNPM_VERSION}

# Copy only package files first for better caching
COPY package.json pnpm-lock.yaml* ./

# Install dependencies without using external cache mounting
RUN pnpm install --frozen-lockfile --prefer-offline

# Build the application
FROM base AS builder
WORKDIR /app

# Install pnpm again in the builder stage
RUN npm install -g pnpm@${PNPM_VERSION}

# Copy deps from previous stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application without database migrations
RUN pnpm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Command to run the application
CMD ["npm", "run", "start"] 