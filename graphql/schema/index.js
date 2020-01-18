var { buildSchema } = require("graphql");

module.exports = buildSchema(`
  type Query {
    getUsers: [User]
    getUser(id: ID): User
    login(email: String!, password: String!): AuthData
  }

  type User {
    id: ID!
    name: String!
    email: String!
    password: String
  }

  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }

  type Mutation {
    register(name: String!, email: String!, password: String): User
  }

  type Subscription {
    userAdded: User!
  }

  schema{
    query:Query
    mutation:Mutation
  }
`);
