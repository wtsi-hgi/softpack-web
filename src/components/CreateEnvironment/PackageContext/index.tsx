import { Dispatch, SetStateAction, createContext } from 'react';

interface PackageContextValue {
  packages: string[];
  setPackages: Dispatch<SetStateAction<string[]>>;
}

const defaultPackage: PackageContextValue = {
  packages: [''],
  setPackages: function (value: SetStateAction<string[]>): void {
    throw new Error('Function not implemented.');
  }
}

export const PackageContext = createContext<PackageContextValue>(defaultPackage);
//export const PackageContext = createContext(['']);