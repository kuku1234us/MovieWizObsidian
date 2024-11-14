/**
 * Modal component for MovieWiz
 *
 * This module provides the modal window that contains the main MovieWiz interface.
 * It handles the modal's lifecycle and styling, and serves as the container for
 * the MovieWiz content component.
 *
 * @component MoviewizModal
 */
import React from "react";
import { Modal, App } from "obsidian";
import { createRoot, Root } from "react-dom/client";
import MoviewizModalContent from "@/components/MoviewizModalContent";
import { GlobalContextProvider } from "@/contexts/GlobalContextProvider";
import type MovieWiz from "@/main";

export class MoviewizModal extends Modal {
  private root: Root | null = null;
  private plugin: MovieWiz;

  constructor(app: App, plugin: MovieWiz) {
    super(app);
    this.plugin = plugin;
  }

  onOpen() {
    console.log("MoviewizModal onOpen");
    const { contentEl, modalEl } = this;

    modalEl.classList.add(
      "bg-opacity-90",
      "shadow-lg",
      "rounded-lg",
      "border",
      "border-blue-600",
      "p-4",
      "max-w-lg",
      "mx-auto",
      "my-16",
      "text-white"
    );
    modalEl.style.backgroundColor = "rgba(5, 21, 34, 0.5)";
    modalEl.style.backdropFilter = "blur(4px)";
    modalEl.style.boxShadow = "0 0 15px rgba(0, 0, 0, 0.5)";
    modalEl.style.border = "1px solid #194b75";

    this.root = createRoot(contentEl);
    this.root.render(
      <React.StrictMode>
        <GlobalContextProvider app={this.app} plugin={this.plugin}>
          <MoviewizModalContent closeModal={() => this.close()} />
        </GlobalContextProvider>
      </React.StrictMode>
    );
  }

  onClose() {
    console.log("MoviewizModal onClose");
    this.root?.unmount();
  }
}
