FROM node:latest
RUN mkdir -p /usr/src/app/express-api
WORKDIR /usr/src/app/express-api
COPY node-app/package.json /usr/src/app/express-api
RUN npm install -g nodemon
COPY node-app/ /usr/src/app/express-api/
EXPOSE 3000
CMD npm i && nodemon index.js
