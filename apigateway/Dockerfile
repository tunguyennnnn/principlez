FROM node:10.15.0-alpine

WORKDIR /usr/src/app

COPY ./package.* ./

RUN npm install -g yarn
RUN npm install -g sequelize-cli

RUN chmod a+rwx  /usr/local/lib/node_modules/yarn/bin/yarn*

RUN chmod a+rwx  /usr/local/bin/yarn*

RUN yarn install

COPY . .

EXPOSE 4000
