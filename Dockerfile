# build
FROM node:19.9.0 AS builder

WORKDIR /app

COPY . .
COPY web/public/config/env.production.js web/public/config/env.js

RUN yarn rebuild
RUN yarn build

RUN cp -R uibitz/build web/build/uibitz
RUN cp -R market-docs/build web/build/marketDocs

# serve
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/web/build .
COPY --from=builder /app/docker/nginx.conf /etc/nginx/conf.d/default.conf
