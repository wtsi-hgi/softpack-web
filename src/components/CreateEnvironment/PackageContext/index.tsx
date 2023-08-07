import { createContext } from 'react';

interface PackageContextValue {
    packages: string[] | null;
    setPackages: React.Dispatch<React.SetStateAction<string[] | null>>;
}

export const PackageContext = createContext<PackageContextValue | undefined>(undefined);