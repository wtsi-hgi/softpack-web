import { gql } from "./__generated__/gql"
import type { Environment } from "./__generated__/graphql"
export type { Environment } from "./__generated__/graphql"

export type Environments = {
  environments: Environment[];
}

export type States = "queued" | "ready" | "failed";

export type Package = {
  name: string;
  version?: string | null;
}

export const ALL_ENVIRONMENTS = gql(`
  query Environments {
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
`);

export type PackageMultiVersion = {
  name: string;
  versions: string[];
};

export type Packages = {
  packageCollections: PackageMultiVersion[];
}

export const ALL_PACKAGES = gql(`
  query Packages {
    packageCollections {
      name
      versions
    }
  }
`);

export type CreateEnvironment = {
  createEnvironment: {
    __typename: "CreateEnvironmentSuccess" | string;
    message: string;
  };
}

export const CREATE_ENV = gql(`
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
`);

export const GROUPS = gql(`
  query Groups($username: String!) {
    groups(username: $username) {
      name
    }
  }
`);