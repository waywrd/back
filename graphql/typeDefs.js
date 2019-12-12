const { gql } = require("apollo-server-express");

module.exports = gql`
  type Query {
    getUsers: [User]
    getUser(id: ID): User
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Mutation {
    register(name: String!, email: String!): User!
  }
`;
