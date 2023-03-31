const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')

let users = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Joshua Kerievsky',
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz',
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

let environments = [
  {
    name: 'whistling-acorn',
    packages: [],
    owners: [],
  },
  {
    name: 'jumping-humpback',
    packages: [],
    owners: [],
  },
  {
    name: 'spotted-peacock',
    packages: [],
    owners: [],
  },
  { 
    name: 'hasty-daffodil',
    packages: [],
    owners: [],
  },
  { 
    name: 'dusty-leaf',
    packages: [],
    owners: [],
  },
]

let packages = [
  {
    name: 'Robert Martin',
    version: "afa51ab0-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: 'Martin Fowler',
    version: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: 'Fyodor Dostoevsky',
    version: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Joshua Kerievsky',
    version: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz',
    version: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

const typeDefs = `
  type Environment {
    name: String!
    packages: [Package!]!
    owners: [User!]!
  }

  type Package {
    name: String!
    version: String!
  }

  type User {
    name: String!
    id: ID!
  }

  type Query {
    allUsers: [User!]
    allPackages: [User!]
    allEnvironments: [User!]
    findUser(name:String!): [User!]
    findPackage(name:String!): [User!]
    findEnvironment(name:String!): [User!]
  }

  type Mutation {
    addEnvironment(
      name: String!
    ):Environment!
    editEnvironment(
      name: String!
    ):Environment!
    removeEnvironment(
      name: String!
    ):Environment!
  }
`
// can have two options: find exact package match, or close package match

const resolvers = {
  Query: {
    allUsers: () => users,
    allPackages: () => packages,
    allEnvironments: () => environments,
    findUser: (root, args) => 
      users.find(u => u.name === args.name),
    findPackage: (root, args) => 
      packages.find(u => u.name === args.name),
    findEnvironment: (root, args) => 
      environments.find(u => u.name === args.name),
  },

}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({url}) => {
  console.log(`Server ready at ${url}`)
})