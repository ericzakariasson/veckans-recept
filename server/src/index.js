require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const db = require('./db');

const schema = require('./schema');
const resolvers = require('./resolvers');

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  playground: true,
  context: () => ({ models: db })
});

const PORT = process.env.PORT || 4000;

// const isProduction = process.env.NODE_ENV === 'production';

db.sequelize
  .sync()
  .then(() => {
    console.log(`Database connection to ${process.env.DB_HOST} established`);
    server.listen(PORT, () => console.log(`Apollo Server running on http://localhost:${PORT}/graphql`));
  })
  .catch(err => console.error(err));
