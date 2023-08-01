import { gql } from '@apollo/client'

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

export const CREATE_ENV = gql`
  mutation Create($name: String!, $description: String!, $path: String!, $packages: [PackageInput!]!) {
    createEnvironment(
      env: {
        description: $description,
        name: $name, 
        packages: $packages,
        path: $path}
    ) {
      ... on Environment {
        id
        name
        description
        packages {
          name
        }
      }
      ... on EnvironmentAlreadyExistsError {
        __typename
        name
        path
      }
    }
  }
`