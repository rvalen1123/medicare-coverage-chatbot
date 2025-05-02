FROM node:18-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@9.12.3

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies without frozen lockfile
RUN pnpm install

# Copy the rest of the application
COPY . .

# Build the application
RUN pnpm run build

# Expose the port
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"] 