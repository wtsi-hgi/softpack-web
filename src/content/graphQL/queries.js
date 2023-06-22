import { gql } from '@apollo/client'

export const TEST_ALL = gql`
  query {
    packageCollections {
      id
      name
      packages {
        id
        name
        versions
      }
    }
    environments {
      description
      id
      name
      path
      packages {
        id
        name
        version
      }
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
    environments {
      description
      id
      name
      path
      packages {
        id
        name
        version
      }
    }
  }
`

export const ALL_PACKAGES = gql`
  query {
    packageCollections {
      id
      name
      packages {
        id
        name
        versions
      }
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