/**
 * Settings page component for MovieWiz
 *
 * This component provides the settings interface for MovieWiz, allowing users to:
 * - Configure API keys (TMDB and OMDB)
 * - Select template file location
 * - Choose output folder for movie notes
 *
 * @component SettingsPage
 */
import {
  App,
  PluginSettingTab,
  Setting,
  TFolder,
  TFile,
  FuzzySuggestModal,
  normalizePath,
} from "obsidian";
import MovieWiz from "@/main";
import { MovieWizSettings, DEFAULT_SETTINGS } from "../types/MovieWizSettings";

export class SettingsPage extends PluginSettingTab {
  plugin: MovieWiz;
  settings: MovieWizSettings;

  constructor(app: App, plugin: MovieWiz) {
    super(app, plugin);
    this.plugin = plugin;
    this.settings = Object.assign({}, DEFAULT_SETTINGS, plugin.settings);
  }

  async saveSettings() {
    await this.plugin.saveData(this.settings);
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl("h2", { text: "MovieWiz Settings" });

    // TMDB API Key
    new Setting(containerEl)
      .setName("TMDB API Key")
      .setDesc("Your API key from The Movie Database (TMDB)")
      .addText((text) =>
        text
          .setPlaceholder("Enter your TMDB API key")
          .setValue(this.settings.tmdbApiKey)
          .onChange(async (value) => {
            this.settings.tmdbApiKey = value;
            await this.saveSettings();
          })
      );

    // OMDB API Key
    new Setting(containerEl)
      .setName("OMDB API Key")
      .setDesc(
        "Your API key from Open Movie Database (OMDB) - Optional, used for IMDb ratings"
      )
      .addText((text) =>
        text
          .setPlaceholder("Enter your OMDB API key")
          .setValue(this.settings.omdbApiKey)
          .onChange(async (value) => {
            this.settings.omdbApiKey = value;
            await this.saveSettings();
          })
      );

    // Template File Location
    new Setting(containerEl)
      .setName("Template File Location")
      .setDesc("Location of your Movie Template file")
      .addText((text) =>
        text
          .setPlaceholder("Path to template file")
          .setValue(this.settings.templatePath)
          .onChange(async (value) => {
            this.settings.templatePath = value;
            await this.saveSettings();
          })
      )
      .addButton((button) =>
        button.setButtonText("Browse").onClick(async () => {
          const files = this.app.vault.getFiles();
          const modal = new FileSuggestModal(
            this.app,
            files,
            async (file: TFile) => {
              this.settings.templatePath = file.path;
              await this.saveSettings();
              this.display();
            }
          );
          modal.open();
        })
      );

    // Output Folder
    new Setting(containerEl)
      .setName("Movie Notes Location")
      .setDesc("Where to save new movie notes")
      .addText((text) =>
        text
          .setPlaceholder("Path to output folder")
          .setValue(this.settings.outputFolder)
          .onChange(async (value) => {
            this.settings.outputFolder = value;
            await this.saveSettings();
          })
      )
      .addButton((button) =>
        button.setButtonText("Browse").onClick(async () => {
          const folders = this.app.vault
            .getAllLoadedFiles()
            .filter((f) => f instanceof TFolder) as TFolder[];
          const modal = new FolderSuggestModal(
            this.app,
            folders,
            async (folder: TFolder) => {
              this.settings.outputFolder = folder.path;
              await this.saveSettings();
              this.display();
            }
          );
          modal.open();
        })
      );

    // Add a note about API keys
    containerEl.createEl("p", {
      text: "Note: You need at least a TMDB API key for the plugin to work. Get one at themoviedb.org",
      attr: { style: "opacity: 0.7; margin-top: 2em;" },
    });
  }
}

// File suggester modal
class FileSuggestModal extends FuzzySuggestModal<TFile> {
  constructor(
    app: App,
    private files: TFile[],
    private onChoose: (file: TFile) => void
  ) {
    super(app);
  }

  getItems(): TFile[] {
    return this.files;
  }

  getItemText(file: TFile): string {
    return file.path;
  }

  onChooseItem(file: TFile): void {
    this.onChoose(file);
  }
}

// Folder suggester modal
class FolderSuggestModal extends FuzzySuggestModal<TFolder> {
  constructor(
    app: App,
    private folders: TFolder[],
    private onChoose: (folder: TFolder) => void
  ) {
    super(app);
  }

  getItems(): TFolder[] {
    return this.folders;
  }

  getItemText(folder: TFolder): string {
    return folder.path;
  }

  onChooseItem(folder: TFolder): void {
    this.onChoose(folder);
  }
}
