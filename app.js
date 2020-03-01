'use strict';

const express = require('express');
const graphqlHTTP = require('express-graphql');
const bearerToken = require('express-bearer-token');

const { jobsSchema } = require('./src/schema');

const PORT = process.env.PORT || 3000;
const VALID_TOKEN = process.env.TOKEN || 'I_am_a_valid_token';
const app = express();

app.use(bearerToken());
app.use(function (req, res, next) {
  if (req.token === VALID_TOKEN) {
    next();
  } else {
    res.status(401).send('you are missing a valid token');
  }
});
app.use('/graphql', graphqlHTTP({
  schema: jobsSchema,
  graphiql: true,
}));

app.listen(PORT, () => {
  console.log(`Running a GraphQL API server at http://localhost:${PORT}/graphql`);
});
