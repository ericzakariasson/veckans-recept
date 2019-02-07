# Build
FROM node:10 AS build

ENV REACT_APP_API_URL=${REACT_APP_API_URL}

WORKDIR /app

COPY package*.json /app/
RUN npm install --production
COPY ./ /app/
RUN npm run build

# Serve
FROM nginx:latest
COPY --from=build /app/build /usr/share/nginx/html
