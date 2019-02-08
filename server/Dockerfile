FROM node:10
WORKDIR /app
COPY ./package*.json /app/
RUN npm install --production
COPY ./ /app/

RUN npm run migrate --prefix ../db

CMD ["node", "./src/index.js"]