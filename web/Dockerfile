FROM node:latest

WORKDIR /web

EXPOSE 3000

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

CMD [ "npm", "run", "start" ]