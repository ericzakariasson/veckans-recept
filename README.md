# Veckans Recept

A webapp which scrapes and suggests recipes for the week

## Gettings started

#### Prerequisites

You need to have the following services to get the applications running

- Postgres database to store the recipes
- Node.js to run the applications

You also have to setup a database and a user in Postgres for the application to use.

#### Installing

Clone the repo and `cd veckans-recept`

Do `npm install` for the following directories:

- `scraper/`
- `server/`
- `client/`

Once you have installed all packages, fill in databse connection info in the `.env`-file located in both `server/` and `scraper/`.

`DB_HOST` - eg. `123.45.678.910`

`DB_PORT` - default `5432`

`DB_DATABASE` - name of the database

`DB_USER` - User you have created

`DB_PASSWORD` - Password for user

In `scraper/` you have to set how many recipes to scraped at a time. You set this value in the `BATCH_SIZE` field in the `scraped/.env`-file.

`BATCH_SIZE=8192` - Recommended value is `8192`

#### Running

Once you have all set up you can run `npm run scrape` in the `scraper/` directory. This will start to scrape and fill the database with recipes.

When you have scraped som recipes, you can start the GraphQL-server by running `npm start` in the `server/` directory.

And finally you can start the client by running `npm start` in the `client/` directory.

You should now be able to use the app

## Built with

- Node
- Postgres
- Puppeteer
- Cheerio
- Sequelize
- GraphQL
- Apollo Server
  <!-- - Apollo -->
  <!-- - React -->
  <!-- - Styled components -->

## Todo

- Build frontend
- Add units 'burk', 'st', 'förp'
- Parse time in minutes as integer
- Store difficulty as integer
