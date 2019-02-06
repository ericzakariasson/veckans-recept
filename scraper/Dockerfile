FROM node:10
WORKDIR /app
COPY ./scraper/package*.json /app/
RUN npm install --production
COPY ./scraper ./app
COPY ./models ./models