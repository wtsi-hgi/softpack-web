import { createContext } from 'react';

interface PackageContextValue {
    testPackages: string[] | null;
    setTestPackages: React.Dispatch<React.SetStateAction<string[] | null>>;
}

export const PackageContext = createContext<PackageContextValue | undefined>(undefined);
//export const PackageContext = createContext(['']);