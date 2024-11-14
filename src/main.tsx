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

// Main plugin class
export default class MovieWiz extends Plugin {
  async onload() {
    try {
      console.log("Loading MovieWiz...");

      // Command to show the Hello World popup
      this.addCommand({
        id: "show-moviewiz-popup",
        name: "Show MovieWiz Popup",
        icon: "clapperboard",
        callback: () => {
          try {
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

  onunload() {
    console.log("Unloading MovieWiz...");
  }

  showMovieWizPopup() {
    const dialog = new MoviewizModal(this.app);
    dialog.open();
  }
}
