FROM node:20-alpine

WORKDIR /app

# Copy this service's package files
COPY services/auth/package.json ./package.json
COPY services/auth/package-lock.json* ./
RUN npm install --omit=dev

# Copy shared utilities and service source
COPY shared ./shared
COPY services/auth ./

EXPOSE 8001

CMD ["node", "index.js"]
