FROM node:20-alpine

WORKDIR /app

# Root backend deps (ioredis + dotenv for shared/redis module)
COPY package*.json ./
RUN npm install

# Gateway deps
COPY gateway/package*.json ./gateway/
RUN cd gateway && npm install

# Source
COPY gateway ./gateway
COPY shared ./shared

WORKDIR /app/gateway

EXPOSE 8000

CMD ["npm", "start"]
