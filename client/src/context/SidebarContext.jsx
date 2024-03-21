import React, { createContext, useState } from 'react';

export const SidebarContext= createContext();

const SidebarProvider = ({children}) => {
    const [isOpen, setIsOpen]= useState(false);

    const sidebarClose=()=>{
        setIsOpen(false)
    }

    return (
        <SidebarContext.Provider value={{isOpen, setIsOpen, sidebarClose}}>
            {children}
        </SidebarContext.Provider>
    );
};

export default SidebarProvider;