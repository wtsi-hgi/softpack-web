import { Dispatch, SetStateAction, createContext } from 'react';

interface PackageContextValue {
  testPackages: string[];
  setTestPackages: Dispatch<SetStateAction<string[]>>;
}

const defaultPackage: PackageContextValue = {
  testPackages: [''],
  setTestPackages: function (value: SetStateAction<string[]>): void {
    throw new Error('Function not implemented.');
  }
}

export const PackageContext = createContext<PackageContextValue>(defaultPackage);
//export const PackageContext = createContext(['']);