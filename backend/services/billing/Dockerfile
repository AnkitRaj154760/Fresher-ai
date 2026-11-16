FROM node:20-alpine

WORKDIR /app

# Copy this service's package files
COPY services/billing/package.json ./package.json
COPY services/billing/package-lock.json* ./
RUN npm install --omit=dev

# Copy shared utilities and service source
COPY shared ./shared
COPY services/billing ./

EXPOSE 8005

CMD ["node", "index.js"]
