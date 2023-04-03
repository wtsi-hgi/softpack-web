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
      packages
      owners
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