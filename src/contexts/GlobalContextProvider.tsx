/**
 * Global context provider for MovieWiz
 *
 * This module provides global access to the Obsidian App instance throughout
 * the React component tree. It includes a custom hook (useApp) for consuming
 * the context and type-safe access to the App instance.
 *
 * @module GlobalContextProvider
 */
import React, { createContext, useContext } from "react";
import { App } from "obsidian";

interface GlobalContextType {
  app: App;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalContextProvider: React.FC<{
  children: React.ReactNode;
  app: App;
}> = ({ children, app }) => {
  return (
    <GlobalContext.Provider value={{ app }}>{children}</GlobalContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useApp must be used within a GlobalContextProvider");
  }
  return context.app;
};
