import { createContext } from "react";

export type UserContextType = {
  username: string;
  groups: string[];
};

export const UserContext = createContext<UserContextType>({
  username: "",
  groups: [],
});
