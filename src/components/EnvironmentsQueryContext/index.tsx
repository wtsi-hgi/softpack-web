import { useQuery } from "@apollo/client";
import { createContext } from "react";

import {
  EnvironmentsQuery,
  EnvironmentsQueryVariables,
} from "../../__generated__/graphql";

export type EnvironmentsQueryContextType = ReturnType<
  typeof useQuery<EnvironmentsQuery, EnvironmentsQueryVariables>
>;
export const EnvironmentsQueryContext =
  createContext<EnvironmentsQueryContextType>(null!); // FIXME
