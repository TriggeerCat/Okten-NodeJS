FROM node:20-alpine

LABEL org.opencontainers.image.authors="TriggeerCat"

RUN mkdir /app
WORKDIR /app

COPY ./backend/package.json .

RUN npm i
