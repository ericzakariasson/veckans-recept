FROM node:10
WORKDIR /app

RUN apt-get update
RUN apt-get install -y cron

RUN apt-get install -y wget --no-install-recommends \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-unstable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst ttf-freefont \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get purge --auto-remove -y curl \
    && rm -rf /src/*.deb




COPY ./package*.json /app/
RUN npm install --production
COPY ./ /app/

RUN mkdir /cron
RUN touch /cron/cron.log

COPY cronjob /cron
COPY do.sh /cron

RUN chmod +x do.sh
RUN chmod 0600 cronjob

CMD ["cron", "-f"]