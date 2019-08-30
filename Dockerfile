FROM node:latest

WORKDIR /app

ENTRYPOINT [ "npm", "start" ]