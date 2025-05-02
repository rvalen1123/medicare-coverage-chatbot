FROM node:18-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@9.12.3

# Copy only the necessary files
COPY package.json pnpm-lock.yaml* simple-server.js ./
COPY public ./public

# Install only the dependencies needed for the express server
RUN pnpm install express

# Expose the port
EXPOSE 3000

# Start the simple server
CMD ["node", "simple-server.js"] 