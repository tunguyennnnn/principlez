FROM node:10.15.0-alpine

WORKDIR /usr/src/app

COPY ./apigateway/package* ./

RUN npm install --only=production && \
  npm cache clean --force

COPY ./apigateway/build .

EXPOSE 4000

ENV APP_COMMIT_REF=${COMMIT_REF} \
  APP_BUILD_DATE=${BUILD_DATE}

CMD npm run prod