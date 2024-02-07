/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query Environments {\n    environments {\n      description\n      name\n      path\n      packages {\n        name\n        version\n      }\n      readme\n      type\n      state\n    }\n  }\n": types.EnvironmentsDocument,
    "\n  query Packages {\n    packageCollections {\n      name\n      versions\n    }\n  }\n": types.PackagesDocument,
    "\n  mutation Create($name: String!, $description: String!, $path: String!, $packages: [PackageInput!]!) {\n    createEnvironment(\n      env: {\n        name: $name, \n        description: $description,\n        path: $path,\n        packages: $packages,\n      }\n    ) {\n      __typename\n      ... on CreateEnvironmentSuccess {\n        message\n      }\n      ... on Error {\n        message\n      }\n    }\n  }\n": types.CreateDocument,
    "\n  query Groups($username: String!) {\n    groups(username: $username) {\n      name\n    }\n  }\n": types.GroupsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Environments {\n    environments {\n      description\n      name\n      path\n      packages {\n        name\n        version\n      }\n      readme\n      type\n      state\n    }\n  }\n"): (typeof documents)["\n  query Environments {\n    environments {\n      description\n      name\n      path\n      packages {\n        name\n        version\n      }\n      readme\n      type\n      state\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Packages {\n    packageCollections {\n      name\n      versions\n    }\n  }\n"): (typeof documents)["\n  query Packages {\n    packageCollections {\n      name\n      versions\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Create($name: String!, $description: String!, $path: String!, $packages: [PackageInput!]!) {\n    createEnvironment(\n      env: {\n        name: $name, \n        description: $description,\n        path: $path,\n        packages: $packages,\n      }\n    ) {\n      __typename\n      ... on CreateEnvironmentSuccess {\n        message\n      }\n      ... on Error {\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Create($name: String!, $description: String!, $path: String!, $packages: [PackageInput!]!) {\n    createEnvironment(\n      env: {\n        name: $name, \n        description: $description,\n        path: $path,\n        packages: $packages,\n      }\n    ) {\n      __typename\n      ... on CreateEnvironmentSuccess {\n        message\n      }\n      ... on Error {\n        message\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Groups($username: String!) {\n    groups(username: $username) {\n      name\n    }\n  }\n"): (typeof documents)["\n  query Groups($username: String!) {\n    groups(username: $username) {\n      name\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;