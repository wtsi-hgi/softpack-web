const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const { v1: uuid } = require('uuid')

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
    id: "hdfhs7an-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: 'jumping-humpback',
    packages: [],
    owners: [],
    id: "hh37kjsd-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: 'spotted-peacock',
    packages: [],
    owners: [],
    id: "dhs82jfd-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'hasty-daffodil',
    packages: [],
    owners: [],
    id: "df8skjfl-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'dusty-leaf',
    packages: [],
    owners: [],
    id: "22dxzmgl-344d-11e9-a414-719c6709cf3e",
  },
]

let packages = [
  {
    name: 'Package 1',
    version: "afa51ab0-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: 'Package 2',
    version: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: 'Package 3',
    version: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Package 4',
    version: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Package 5',
    version: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

const typeDefs = `
  type Environment {
    name: String!
    packages: [Package!]!
    owners: [User!]!
    id: ID!
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
    allUsers: [User!]!
    allPackages: [Package!]!
    allEnvironments: [Environment!]!

    findUser(name:String!): [User!]
    findPackage(name:String!): [Package!]
    findEnvironment(name:String!): [Environment!]
  }

  type Mutation {
    addUser(name: String!): User!
    editUser(name: String!): User!
    removeUser(name: String!): User!
    
    addEnvironment(name: String!, packages: [String!]!, owners: [String!]!): Environment!
    editEnvironment(name: String!): Environment!
    removeEnvironment(name: String!): Environment!
    
    addPackage(name: String!): Package!
    editPackage(name: String!): Package!
    removePackage(name: String!): Package!
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

  Mutation: {
    addUser: (root, args) => {
      if (users.find(p => p.name === args.name)) {
        throw new GraphQLError('Name must be unique', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name
          }
        })
      }

      if ((args.name === '') || (args.name === ' ')) {
        throw new GraphQLError('Name must not be empty', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name
          }
        })
      }

      const user = { ...args, id: uuid() }
      console.log("new user created", user)
      users = users.concat(user)
      return user
    },

    addEnvironment: (root, args) => {
      if (environments.find(e => e.name === args.name)) {
        throw new GraphQLError('Name must be unique', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name
          }
        })
      }

      if ((args.name === '') || (args.name === ' ')) {
        throw new GraphQLError('Name must not be empty', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name
          }
        })
      }

      console.log("received args", args)

      var packages = []
      for (var i = 0; i < args.packages.length; i++) {
        const package = { name: args.packages[i], version: uuid() }
        packages.push(package)
      }

      var owners = []
      for (var i = 0; i < args.owners.length; i++) {
        const user = { name: args.owners[i], id: uuid() }
        owners.push(user)
      }
      
      const environment = { 
        name: args.name,
        packages: packages,
        owners: owners,
        id: uuid() 
      }

      console.log("new environment created", environment)
      environments = environments.concat(environment)
      console.log("new environments", environments)
      return environment
    }
  }
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