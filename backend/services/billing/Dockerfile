FROM node:20-alpine

WORKDIR /app

COPY backend/package*.json ./
RUN npm install

COPY backend/services/billing/package*.json ./services/billing/
RUN cd services/billing && npm install

COPY backend/services/billing ./services/billing
COPY backend/shared ./shared

WORKDIR /app/services/billing

EXPOSE 8005

CMD ["npm", "start"]
