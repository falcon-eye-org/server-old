FROM node:lts-jessie

LABEL author="ImOverlord"
LABEL version="1.0.0"

EXPOSE 3000
EXPOSE 9299

RUN mkdir /app
WORKDIR /app
COPY . .

RUN npm install
RUN npm run build
CMD npm run start:dev