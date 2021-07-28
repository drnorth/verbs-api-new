FROM node:12
WORKDIR /usr/src/app
COPY package*.json ./
COPY nodemon*.json ./
RUN yarn
COPY . .
EXPOSE 8000