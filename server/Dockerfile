FROM node:10
WORKDIR /app
COPY ./package*.json /app/
RUN npm install --production
COPY ./ /app/

CMD ["node", "./src/index.js"]