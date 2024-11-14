/**
 * Global context provider for MovieWiz
 *
 * This module provides global access to the Obsidian App instance and plugin settings
 * throughout the React component tree. It includes custom hooks for consuming
 * the context and type-safe access to the App instance and settings.
 *
 * @module GlobalContextProvider
 */
import React, { createContext, useContext } from "react";
import { App } from "obsidian";
import type MovieWiz from "@/main";
import { MovieWizSettings } from "../types/MovieWizSettings";

interface GlobalContextType {
  app: App;
  settings: MovieWizSettings;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalContextProvider: React.FC<{
  children: React.ReactNode;
  app: App;
  plugin: MovieWiz;
}> = ({ children, app, plugin }) => {
  return (
    <GlobalContext.Provider value={{ app, settings: plugin.settings }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useApp must be used within a GlobalContextProvider");
  }
  return context.app;
};

export const useSettings = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a GlobalContextProvider");
  }
  return context.settings;
};
