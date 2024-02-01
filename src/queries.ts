import { gql } from '@apollo/client'

export type Environments = {
  environments: Environment[];
}

export type States = "queued" | "ready" | "failed";

export type Environment = {
  description: string;
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

export type CreateEnvironment = {
  createEnvironment: {
    __typename: "CreateEnvironmentSuccess" | string;
    message: string;
  };
}

export const CREATE_ENV = gql`
  mutation Create($name: String!, $description: String!, $path: String!, $packages: [PackageInput!]!) {
    createEnvironment(
      env: {
        name: $name, 
        description: $description,
        path: $path,
        packages: $packages,
      }
    ) {
      __typename
      ... on CreateEnvironmentSuccess {
        message
      }
      ... on Error {
        message
      }
    }
  }
`

export const GROUPS = gql`
  query GroupsQuery($username: String!) {
    groups(username: $username) {
      name
    }
  }
`