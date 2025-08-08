FROM node:20-alpine

WORKDIR /app

# Install dependencies first for better layer caching
COPY package*.json ./
RUN npm ci

# Copy the rest of the app
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Ensure Vite binds to all interfaces inside the container
ENV HOST=0.0.0.0

# Start Vite dev server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]