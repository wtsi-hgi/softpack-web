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

export const CREATE_ENV = gql`
  mutation Create($name: String!, $description: String!, $path: String!, $packages: [PackageInput!]!) {
    createEnvironment(
      env: {
        description: $description,
        name: $name, 
        packages: $packages,
        path: $path}
    ) {
      ... on CreateEnvironmentSuccess {
        message
        environment {
          description
          id
          path
          state
          packages {
            name
            version
          }
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