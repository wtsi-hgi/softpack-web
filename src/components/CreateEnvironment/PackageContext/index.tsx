import { Dispatch, SetStateAction, createContext } from "react";

// PackageContext is the context responsible for the package selecting that goes
// on when a user is trying to create a new environment. This warrants a
// context, because some 'prop drilling' is going on, which I wish to avoid.

interface PackageContextValue {
  testPackages: string[];
  setTestPackages: Dispatch<SetStateAction<string[]>>;
}

const defaultPackage: PackageContextValue = {
  testPackages: [""],
  setTestPackages: function (_value: SetStateAction<string[]>): void {
    throw new Error("Function not implemented.");
  },
};

export const PackageContext =
  createContext<PackageContextValue>(defaultPackage);
