FROM node:14 as base

WORKDIR /usr/app

# RUN npm i

# COPY . .

FROM base as dev
ENV NODE_ENV=development
COPY package*.json .