import { gql } from "./__generated__/gql";
import type { EnvironmentsQuery } from "./__generated__/graphql";

export type Environments = EnvironmentsQuery["environments"];
export type Environment = Environments[number];

export type States = "queued" | "ready" | "failed";

export type Package = {
  name: string;
  version?: string | null;
};

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
      tags
      readme
      type
      state
      requested
      buildStart
      buildDone
      avgWaitSecs
    }
  }
`);

export type PackageMultiVersion = {
  name: string;
  versions: string[];
};

export type Packages = {
  packageCollections: PackageMultiVersion[];
};

export const ALL_PACKAGES = gql(`
  query Packages {
    packageCollections {
      name
      versions
    }
  }
`);

export const CREATE_ENV = gql(`
  mutation Create($name: String!, $description: String!, $path: String!, $packages: [PackageInput!]!, $tags: [String!]) {
    createEnvironment(
      env: {
        name: $name,
        description: $description,
        path: $path,
        packages: $packages,
        tags: $tags,
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
