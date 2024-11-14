/**
 * Default settings for MovieWiz
 *
 * This module provides the default configuration values for the plugin.
 * These values are used when the plugin is first installed or reset.
 */

import { MovieWizSettings } from "@/types/MovieWizSettings";

export const DEFAULT_SETTINGS: MovieWizSettings = {
  tmdbApiKey: "",
  omdbApiKey: "",
  templatePath: "Assets/Templates/Movie Template.md",
  outputFolder: "Movies/MovieData",
};
