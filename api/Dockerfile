FROM node:latest

RUN apt-get update
RUN npm init -y && npm add express && npm add request && npm add cors && npm add body-parser
RUN npm install -g nodemon

WORKDIR /app
COPY . /app

CMD npm start