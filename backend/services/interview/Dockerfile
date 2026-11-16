FROM node:20-alpine

WORKDIR /app

# Copy this service's package files
COPY services/interview/package.json ./package.json
COPY services/interview/package-lock.json* ./
RUN npm install --omit=dev

# Copy shared utilities and service source
COPY shared ./shared
COPY services/interview ./

EXPOSE 8003

CMD ["node", "index.js"]
