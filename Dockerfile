FROM node:20.9.0-alpine3.18

WORKDIR /usr/src

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3030

ENV MYSQL_HOST=localhost MYSQL_PORT=3306 MYSQL_USER=root MYSQL_PASSWORD=hello_R00t MYSQL_DBNAME=todolist

CMD npm run start
