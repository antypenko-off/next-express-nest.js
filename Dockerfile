FROM node:22-alpine

MAINTAINER VovaLAS

RUN mkdir /app
WORKDIR /app

COPY ./backend/package.json .

RUN npm i