FROM node:20-alpine

WORKDIR /app

COPY backend/package*.json ./
RUN npm install

COPY backend/services/roadmap/package*.json ./services/roadmap/
RUN cd services/roadmap && npm install

COPY backend/services/roadmap ./services/roadmap
COPY backend/shared ./shared

WORKDIR /app/services/roadmap

EXPOSE 8004

CMD ["npm", "start"]
