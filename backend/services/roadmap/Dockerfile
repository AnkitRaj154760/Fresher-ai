FROM node:20-alpine

WORKDIR /app

# Copy this service's package files
COPY services/roadmap/package.json ./package.json
COPY services/roadmap/package-lock.json* ./
RUN npm install --omit=dev

# Copy shared utilities and service source
COPY shared ./shared
COPY services/roadmap ./

EXPOSE 8004

CMD ["node", "index.js"]
