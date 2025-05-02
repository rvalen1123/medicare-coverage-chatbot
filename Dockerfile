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
ENV NEXT_SHARP_PATH=/tmp/node_modules/sharp
ENV NEXTAUTH_SECRET=dummy-secret-for-build
ENV NEXTAUTH_URL=http://localhost:3000
ENV NEXT_PUBLIC_APP_URL=http://localhost:3000
ENV DATABASE_URL=postgresql://postgres:postgres@localhost:5432/postgres
ENV OPENAI_API_KEY=dummy-key-for-build
ENV NODE_OPTIONS="--max_old_space_size=4096"

# Create a simple Next.js config to use during build
RUN echo 'export default { output: "standalone" };' > next.config.simple.js

# Copy the existing next.config.ts as a backup
RUN cp next.config.ts next.config.ts.backup

# Use a completely minimal build approach
RUN pnpm run build:minimal || \
    (mv next.config.simple.js next.config.js && pnpm run build:minimal)

# Restore the original next.config if needed
RUN if [ -f next.config.ts.backup ]; then mv next.config.ts.backup next.config.ts; fi

# Expose the port
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"] 