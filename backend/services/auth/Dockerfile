FROM node:20-alpine

WORKDIR /app

# Copy and install backend root deps (shared modules like redis.js need ioredis, dotenv)
COPY backend/package*.json ./
RUN npm install

# Copy and install auth-specific deps
COPY backend/services/auth/package*.json ./services/auth/
RUN cd services/auth && npm install

# Copy source files
COPY backend/services/auth ./services/auth
COPY backend/shared ./shared

WORKDIR /app/services/auth

EXPOSE 8001

CMD ["npm", "start"]
