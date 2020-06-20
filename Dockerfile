FROM node:12
MAINTAINER Ivan Abregu
COPY . /code
RUN npm install /code --save
WORKDIR /code
