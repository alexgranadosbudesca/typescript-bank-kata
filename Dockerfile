FROM node:slim

WORKDIR /code

COPY package.json package-lock.json ./
RUN npm install

EXPOSE 3300
CMD [ "node", "dist/app/main.js" ]
