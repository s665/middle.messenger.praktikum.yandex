FROM alpine:latest
RUN apk add --no-cache --update bash nodejs npm

WORKDIR /var/www
COPY . .

RUN npm install
RUN npm run build

EXPOSE 3000
CMD node server.js
