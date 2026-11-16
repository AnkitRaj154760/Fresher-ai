FROM node:20-alpine

WORKDIR /app

# Copy this service's package files
COPY services/resume/package.json ./package.json
COPY services/resume/package-lock.json* ./
RUN npm install --omit=dev

# Copy shared utilities and service source
COPY shared ./shared
COPY services/resume ./

EXPOSE 8002

CMD ["node", "index.js"]
