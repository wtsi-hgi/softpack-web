/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Date with time (isoformat) */
  DateTime: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type AddTagResponse = AddTagSuccess | EnvironmentNotFoundError | InvalidInputError;

export type AddTagSuccess = Success & {
  __typename?: 'AddTagSuccess';
  message: Scalars['String']['output'];
};

export type BuilderError = Error & {
  __typename?: 'BuilderError';
  message: Scalars['String']['output'];
};

export type CreateEnvironmentSuccess = Success & {
  __typename?: 'CreateEnvironmentSuccess';
  message: Scalars['String']['output'];
};

export type CreateResponse = BuilderError | CreateEnvironmentSuccess | EnvironmentAlreadyExistsError | InvalidInputError;

export type DeleteEnvironmentSuccess = Success & {
  __typename?: 'DeleteEnvironmentSuccess';
  message: Scalars['String']['output'];
};

export type DeleteResponse = DeleteEnvironmentSuccess | EnvironmentNotFoundError;

export type Environment = {
  __typename?: 'Environment';
  avgWaitSecs?: Maybe<Scalars['Float']['output']>;
  buildDone?: Maybe<Scalars['DateTime']['output']>;
  buildStart?: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  packages: Array<Package>;
  path: Scalars['String']['output'];
  readme: Scalars['String']['output'];
  requested?: Maybe<Scalars['DateTime']['output']>;
  state?: Maybe<State>;
  tags: Array<Scalars['String']['output']>;
  type: Type;
};

export type EnvironmentAlreadyExistsError = Error & {
  __typename?: 'EnvironmentAlreadyExistsError';
  message: Scalars['String']['output'];
  name: Scalars['String']['output'];
  path: Scalars['String']['output'];
};

export type EnvironmentInput = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  packages: Array<PackageInput>;
  path: Scalars['String']['input'];
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type EnvironmentNotFoundError = Error & {
  __typename?: 'EnvironmentNotFoundError';
  message: Scalars['String']['output'];
  name: Scalars['String']['output'];
  path: Scalars['String']['output'];
};

export type Error = {
  message: Scalars['String']['output'];
};

export type Group = {
  __typename?: 'Group';
  name: Scalars['String']['output'];
};

export type InvalidInputError = Error & {
  __typename?: 'InvalidInputError';
  message: Scalars['String']['output'];
};

export type Package = {
  __typename?: 'Package';
  name: Scalars['String']['output'];
  version?: Maybe<Scalars['String']['output']>;
};

export type PackageInput = {
  name: Scalars['String']['input'];
  version?: InputMaybe<Scalars['String']['input']>;
};

export type PackageMultiVersion = {
  __typename?: 'PackageMultiVersion';
  name: Scalars['String']['output'];
  versions: Array<Scalars['String']['output']>;
};

export type SchemaMutation = {
  __typename?: 'SchemaMutation';
  addTag: AddTagResponse;
  createEnvironment: CreateResponse;
  createFromModule: CreateResponse;
  deleteEnvironment: DeleteResponse;
  updateFromModule: UpdateResponse;
};


export type SchemaMutationAddTagArgs = {
  name: Scalars['String']['input'];
  path: Scalars['String']['input'];
  tag: Scalars['String']['input'];
};


export type SchemaMutationCreateEnvironmentArgs = {
  env: EnvironmentInput;
};


export type SchemaMutationCreateFromModuleArgs = {
  environmentPath: Scalars['String']['input'];
  file: Scalars['Upload']['input'];
  modulePath: Scalars['String']['input'];
};


export type SchemaMutationDeleteEnvironmentArgs = {
  name: Scalars['String']['input'];
  path: Scalars['String']['input'];
};


export type SchemaMutationUpdateFromModuleArgs = {
  environmentPath: Scalars['String']['input'];
  file: Scalars['Upload']['input'];
  modulePath: Scalars['String']['input'];
};

export type SchemaQuery = {
  __typename?: 'SchemaQuery';
  environments: Array<Environment>;
  groups: Array<Group>;
  packageCollections: Array<PackageMultiVersion>;
};


export type SchemaQueryGroupsArgs = {
  username: Scalars['String']['input'];
};

export enum State {
  Failed = 'failed',
  Queued = 'queued',
  Ready = 'ready'
}

export type Success = {
  message: Scalars['String']['output'];
};

export enum Type {
  Module = 'module',
  Softpack = 'softpack'
}

export type UpdateEnvironmentSuccess = Success & {
  __typename?: 'UpdateEnvironmentSuccess';
  message: Scalars['String']['output'];
};

export type UpdateResponse = EnvironmentNotFoundError | InvalidInputError | UpdateEnvironmentSuccess;

export type EnvironmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type EnvironmentsQuery = { __typename?: 'SchemaQuery', environments: Array<{ __typename?: 'Environment', description: string, name: string, path: string, tags: Array<string>, readme: string, type: Type, state?: State | null, requested?: any | null, buildStart?: any | null, buildDone?: any | null, avgWaitSecs?: number | null, packages: Array<{ __typename?: 'Package', name: string, version?: string | null }> }> };

export type PackagesQueryVariables = Exact<{ [key: string]: never; }>;


export type PackagesQuery = { __typename?: 'SchemaQuery', packageCollections: Array<{ __typename?: 'PackageMultiVersion', name: string, versions: Array<string> }> };

export type CreateMutationVariables = Exact<{
  name: Scalars['String']['input'];
  description: Scalars['String']['input'];
  path: Scalars['String']['input'];
  packages: Array<PackageInput> | PackageInput;
  tags?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type CreateMutation = { __typename?: 'SchemaMutation', createEnvironment: { __typename: 'BuilderError', message: string } | { __typename: 'CreateEnvironmentSuccess', message: string } | { __typename: 'EnvironmentAlreadyExistsError', message: string } | { __typename: 'InvalidInputError', message: string } };

export type AddTagMutationVariables = Exact<{
  name: Scalars['String']['input'];
  path: Scalars['String']['input'];
  tag: Scalars['String']['input'];
}>;


export type AddTagMutation = { __typename?: 'SchemaMutation', addTag: { __typename: 'AddTagSuccess' } | { __typename: 'EnvironmentNotFoundError', message: string } | { __typename: 'InvalidInputError', message: string } };

export type GroupsQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type GroupsQuery = { __typename?: 'SchemaQuery', groups: Array<{ __typename?: 'Group', name: string }> };


export const EnvironmentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Environments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"environments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"packages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"readme"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"requested"}},{"kind":"Field","name":{"kind":"Name","value":"buildStart"}},{"kind":"Field","name":{"kind":"Name","value":"buildDone"}},{"kind":"Field","name":{"kind":"Name","value":"avgWaitSecs"}}]}}]}}]} as unknown as DocumentNode<EnvironmentsQuery, EnvironmentsQueryVariables>;
export const PackagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Packages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"packageCollections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"versions"}}]}}]}}]} as unknown as DocumentNode<PackagesQuery, PackagesQueryVariables>;
export const CreateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Create"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"path"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"packages"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PackageInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tags"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createEnvironment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"env"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"path"},"value":{"kind":"Variable","name":{"kind":"Name","value":"path"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"packages"},"value":{"kind":"Variable","name":{"kind":"Name","value":"packages"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tags"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CreateEnvironmentSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<CreateMutation, CreateMutationVariables>;
export const AddTagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddTag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"path"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tag"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addTag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"path"},"value":{"kind":"Variable","name":{"kind":"Name","value":"path"}}},{"kind":"Argument","name":{"kind":"Name","value":"tag"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tag"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<AddTagMutation, AddTagMutationVariables>;
export const GroupsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Groups"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"groups"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GroupsQuery, GroupsQueryVariables>;