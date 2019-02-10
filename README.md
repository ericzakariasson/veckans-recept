# Veckans Recept

Scraped recipes and provides them in a web application

## Gettings started

#### Prerequisites

You need to have the following services to get the applications running

- Docker
- Docker Compose

#### Installing

Clone the repo and `cd veckans-recept`

Optionally change the environment variables in `.env` to fit your needs.

Recommended value for `BATCH_SIZE` is `8192`, or `2^n`

#### Running

Do `docker-compose up` and you should be all set!

Client will be available at `localhost`

Graphql Playground will be available at `localhost:${API_PORT}/graphql`

## Built with

- Node
- Puppeteer
- Cheerio
- Sequelize
- Postgres
- GraphQL
- Apollo Server
- React (Hooks)
- React Apollo
- React Spring
- Styled components

## Todo

- [ ] Store difficulty as integer
- [ ] Make frontend responsive
- [ ] User accounts
- [ ] User roles
- [ ] Favorites
- [ ] Extract type of recipe
- [ ] Add filtering
- [ ] Set custom week settings, eg fish atleast once a week
