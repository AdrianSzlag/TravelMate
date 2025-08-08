FROM node:20-alpine

WORKDIR /app

# Install only deps first for better layer caching
COPY package*.json tsconfig.json ./
RUN npm ci

# Copy source
COPY . .

# Build TypeScript -> dist
RUN npm run build

EXPOSE 5000

# Default to production runtime on compiled JS
ENV NODE_ENV=production
CMD ["node", "dist/main.js"]