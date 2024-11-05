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
      hidden
      readme
      type
      state
      requested
      buildStart
      buildDone
      avgWaitSecs
      created
      failureReason
      interpreters {
        python
        r
      }
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
  mutation Create($name: String!, $description: String!, $path: String!, $packages: [PackageInput!]!, $tags: [String!], $username: String!) {
    createEnvironment(
      env: {
        name: $name,
        description: $description,
        path: $path,
        packages: $packages,
        tags: $tags,
        username: $username,
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

export const ADD_TAG = gql(`
  mutation AddTag($name: String!, $path: String!, $tag: String!) {
    addTag(
      name: $name,
      path: $path,
      tag: $tag,
    ) {
      __typename
      ... on Error {
        message
      }
    }
  }
`);

export const SET_HIDDEN = gql(`
  mutation SetHidden($name: String!, $path: String!, $hidden: Boolean!) {
    setHidden(
      name: $name,
      path: $path,
      hidden: $hidden,
    ) {
      __typename
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
