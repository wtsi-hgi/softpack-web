import { createContext } from "react";

export type AvailableTagsContextType = string[];
export const AvailableTagsContext = createContext<AvailableTagsContextType>([]);
