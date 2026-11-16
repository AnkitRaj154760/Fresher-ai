FROM node:20-alpine

WORKDIR /app

# Copy gateway package files
COPY gateway/package.json ./package.json
COPY gateway/package-lock.json* ./
RUN npm install --omit=dev

# Copy shared utilities and gateway source
COPY shared ./shared
COPY gateway ./

EXPOSE 8000

CMD ["node", "index.js"]
