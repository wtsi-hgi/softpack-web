import { gql } from '@apollo/client'

export type Environments = {
  environments: Environment[];
}

export type Environment = {
  description: string;
  id: string;
  name: string;
  packages: Package[];
  readme: string;
  path: string;
}

export type Package = {
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
        name
        version
      }
      readme
    }
  }
`

export type Collection = {
  id: string;
  name: string;
  packages: {
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
      name
      packages {
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