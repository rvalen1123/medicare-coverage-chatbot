FROM node:18-alpine

WORKDIR /app

# Install necessary tools
RUN apk add --no-cache git

# Install pnpm
RUN npm install -g pnpm@9.12.3

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies without frozen lockfile
RUN pnpm install

# Copy the rest of the application
COPY . .

# Set environment variables for build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Set up dummy environment variables for build
ENV NEXT_PUBLIC_APP_URL="https://example.com"
ENV DATABASE_URL="postgres://postgres:postgres@localhost:5432/postgres"
ENV OPENAI_API_KEY="dummy-key-for-build"

# Build the application with verbose output to see any errors
RUN pnpm run debug-build

# Expose the port
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"] 