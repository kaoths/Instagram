FROM node:12-alpine

WORKDIR /server

COPY package*.json ./
COPY yarn.lock ./
RUN yarn

COPY . .
RUN yarn build

CMD [ "yarn", "start:prod" ]