FROM node:20-alpine

WORKDIR /app

COPY backend/package*.json ./
RUN npm install

COPY backend/services/interview/package*.json ./services/interview/
RUN cd services/interview && npm install

COPY backend/services/interview ./services/interview
COPY backend/shared ./shared

WORKDIR /app/services/interview

EXPOSE 8003

CMD ["npm", "start"]
