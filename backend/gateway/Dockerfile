FROM node:20-alpine

WORKDIR /app

# Copy and install backend root deps (shared modules like redis.js need ioredis, dotenv)
COPY backend/package*.json ./
RUN npm install

# Copy and install gateway-specific deps
COPY backend/gateway/package*.json ./gateway/
RUN cd gateway && npm install

# Copy source files
COPY backend/gateway ./gateway
COPY backend/shared ./shared

WORKDIR /app/gateway

EXPOSE 8000

CMD ["npm", "start"]
