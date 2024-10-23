import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GuitarContextProps {
    showGuitarDatatable: boolean;
    setShowGuitarDatatable: (show: boolean) => void;
}

const GuitarContext = createContext<GuitarContextProps | undefined>(undefined);

export const GuitarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [showGuitarDatatable, setShowGuitarDatatable] = useState<boolean>(false);

    return (
        <GuitarContext.Provider value={{ showGuitarDatatable, setShowGuitarDatatable }}>
            {children}
        </GuitarContext.Provider>
    );
};

export const useGuitarContext = () => {
    const context = useContext(GuitarContext);
    if (!context) {
        throw new Error('useGuitarContext debe ser usado dentro de un GuitarProvider');
    }
    return context;
};
