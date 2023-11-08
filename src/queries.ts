import { gql } from '@apollo/client'

export type Environments = {
  environments: Environment[];
}

export type States = "queued" | "ready" | "failed";

export type Environment = {
  description: string;
  id: string;
  name: string;
  packages: Package[];
  readme: string;
  path: string;
  type: "softpack" | "module";
  state?: States;
}

export type Package = {
  name: string;
  version: string | null;
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
      type
      state
    }
  }
`

export type PackageMultiVersion = {
  name: string;
  versions: string[];
};

export type Packages = {
  packageCollections: PackageMultiVersion[];
}

export const ALL_PACKAGES = gql`
  query {
    packageCollections {
      name
      versions
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
