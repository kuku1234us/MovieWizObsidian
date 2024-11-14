/**
 * Type declarations for MovieWiz settings
 *
 * This module contains the interface and default settings for the MovieWiz plugin.
 * It is used across the application to ensure type safety for plugin settings.
 *
 * @module MovieWizSettings
 */

export interface MovieWizSettings {
  tmdbApiKey: string;
  omdbApiKey: string;
  templatePath: string;
  outputFolder: string;
}

export const DEFAULT_SETTINGS: MovieWizSettings = {
  tmdbApiKey: "abc",
  omdbApiKey: "bbc",
  templatePath: "Assets/Templates/Movie Template.md",
  outputFolder: "Movies/MovieData",
};
