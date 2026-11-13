FROM node:20-alpine

WORKDIR /app

COPY backend/package*.json ./
RUN npm install

COPY backend/services/resume/package*.json ./services/resume/
RUN cd services/resume && npm install

COPY backend/services/resume ./services/resume
COPY backend/shared ./shared

WORKDIR /app/services/resume

EXPOSE 8002

CMD ["npm", "start"]
