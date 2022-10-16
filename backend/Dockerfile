FROM node:16.6.1-alpine3.14

WORKDIR /home/node

COPY package*.json ./
COPY db.js ./
    

RUN npm install


CMD ["npm","start"]
 