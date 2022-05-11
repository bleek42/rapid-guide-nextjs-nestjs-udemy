FROM node:16.15.0-alpine:3.15 AS development

EXPOSE 7000

RUN mkdir -p /usr/home/app
RUN npm config set cache /usr/home/app/.npm-cache --global

WORKDIR /usr/home/app

COPY package.json ./
RUN npm install
COPY . .

RUN npm run start:dev