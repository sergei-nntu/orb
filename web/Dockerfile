FROM node:latest

WORKDIR /orb

EXPOSE 3000

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "run", "start" ]
