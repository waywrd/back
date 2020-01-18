const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const graphqlSchema = require("./graphql/schema");
const graphqlroot = require("./graphql/resolvers");
const isAuth = require("./graphql/middleware/isAuth");
const cors = require("cors");
const cookieParser = require('cookie-parser')

mongoose.connect("mongodb://localhost:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.once("open", () => {
  console.log("connected to Database");
});

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors());

app.use(isAuth);

app.use(
  "/graphql",
  graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlroot,
    graphiql: true
  })
);

const port = 4000;

app.listen(port);
console.log(`App running at localhost:${port}/graphql`);

// const server = new ApolloServer({
//   cors: true,
//   typeDefs,
//   resolvers,
//   context: async ({ req }) => ({ req })
// });

// server.listen().then(({ url }) => {
//   console.log(`🚀  Server ready at ${url}`);
// });
