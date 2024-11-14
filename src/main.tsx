/**
 * Main plugin module for MovieWiz
 *
 * This module initializes the MovieWiz plugin and sets up the command palette integration.
 * It handles the main plugin lifecycle (load/unload) and provides error handling for the
 * plugin's core functionality.
 *
 * @module MovieWiz
 */
import { Plugin, Notice } from "obsidian";
import React from "react";
import { MoviewizModal } from "@/components/MoviewizModal";
import { SettingsPage } from "@/components/SettingsPage";
import { MovieWizSettings, DEFAULT_SETTINGS } from "./types/MovieWizSettings";

// Main plugin class
export default class MovieWiz extends Plugin {
  settings!: MovieWizSettings;

  async onload() {
    try {
      console.log("Loading MovieWiz...");

      await this.loadSettings();

      // Add settings tab
      this.addSettingTab(new SettingsPage(this.app, this));

      // Command to show the MovieWiz popup
      this.addCommand({
        id: "show-moviewiz-popup",
        name: "Show MovieWiz Popup",
        icon: "clapperboard",
        callback: () => {
          try {
            if (!this.settings.tmdbApiKey) {
              new Notice("⚠️ Please configure TMDB API key in settings first");
              return;
            }
            this.showMovieWizPopup();
          } catch (error) {
            const errorMessage =
              error instanceof Error ? error.message : "Unknown error";
            console.error("Failed to show MovieWiz popup:", error);
            new Notice(
              `❌ Failed to show MovieWiz popup: ${errorMessage}`,
              5000
            );
          }
        },
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error("Failed to load MovieWiz:", error);
      new Notice(`❌ Failed to load MovieWiz: ${errorMessage}`, 5000);
    }
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  onunload() {
    console.log("Unloading MovieWiz...");
  }

  showMovieWizPopup() {
    const dialog = new MoviewizModal(this.app, this);
    dialog.open();
  }
}
