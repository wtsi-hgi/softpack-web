import { gql } from '@apollo/client'

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
