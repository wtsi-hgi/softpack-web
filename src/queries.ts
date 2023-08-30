import { gql } from '@apollo/client'

export type Environments = {
  environments: Environment[];
}

export type Environment = {
  description: string;
  id: string;
  name: string;
  packages: Package[];
  path: string;
}

export type Package = {
  id: string;
  name: string;
  version: string;
}

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

export type Collection = {
  id: string;
  name: string;
  packages: {
    id: string;
    name: string;
    versions: string[];
  }[];
}

export type Packages = {
  packageCollections: Collection[];
}

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

export type CreateEnvironmentSuccess = {
  message: string;
  environment: Environment;
}

export type EnvironmentAlreadyExistsError = {
  name: string;
  path: string;
}

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