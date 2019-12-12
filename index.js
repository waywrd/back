const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers/index");
const { ApolloServer } = require("apollo-server-express");

const startServer = () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  mongoose.connect("mongodb://localhost:27017", { useNewUrlParser: true });
  mongoose.connection.once("open", () => {
    console.log("connected to Database");
  });

  const app = express();
  app.use(cors());

  const port = 5000;

  server.applyMiddleware({
    app
  });

  app.listen({ port }, () => {
    console.log(`Listening for requests on port:${port}`);
  });
};

startServer();
