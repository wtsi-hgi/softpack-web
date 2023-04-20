import { gql } from '@apollo/client'

export const ALL_ENVS = gql`
  query {
    allEnvs {
      creationDate
      description
      id
      name
      owners {
        email
        id
        name
      }
      packages {
        name
        version
      }
      status
    }
  }
`

export const ALL_USERS = gql`
  query {
    allUsers  {
      name
      id
    }
  }
`

export const ALL_ENVIRONMENTS = gql`
  query {
    allEnvironments  {
      name
      packages {
        name
        version
      }
      owners {
        id
        name
      }
    }
  }
`

export const ALL_PACKAGES = gql`
  query {
    allPackages  {
      name
      version
    }
  }
`

export const CREATE_USER = gql`
  mutation createUser($name: String!) {
    addUser(
      name: $name,
    ) {
      name
      id
    }
  }
`

export const CREATE_ENVIRONMENT = gql`
  mutation createEnvironment($name: String!, $packages: [String!]!, 
    $owners: [String!]!) {
    addEnvironment(
      name: $name,
      packages: $packages,
      owners: $owners,
    ) {
      name
      packages {
        name
        version
      }
      owners {
        id
        name
      }
    }
  }
`