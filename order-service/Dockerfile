FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY app.js .

EXPOSE 3003

CMD ["node", "app.js"]
