/**
 * Main content component for the MovieWiz modal
 *
 * This module contains the primary interface for MovieWiz, including the search box
 * and suggestion panel. It handles user interactions, movie selection, and note creation.
 * The component manages the focus states between search and suggestions, and processes
 * the template replacement for new movie notes.
 *
 * @component MoviewizModalContent
 */
import React, { useEffect, useRef, useState } from "react";
import { SearchBox } from "@/components/SearchBox";
import SuggestionPanel from "@/components/SuggestionPanel";
import { TMDBApi } from "@/api/TMDBApi";
import { Notice, TFile, TFolder } from "obsidian";
import { useApp } from "@/contexts/GlobalContextProvider";
import { useSettings } from "@/contexts/GlobalContextProvider";

const MoviewizModalContent = ({ closeModal }: { closeModal: () => void }) => {
  const searchBoxRef = useRef<HTMLInputElement>(null);
  const suggestionPanelRef = useRef<HTMLDivElement>(null);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isSuggestionListFocused, setIsSuggestionListFocused] = useState(false);
  const app = useApp();
  const settings = useSettings();

  useEffect(() => {
    if (searchBoxRef.current) {
      searchBoxRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Tab" && !isSuggestionListFocused) {
      e.preventDefault();
      setIsSuggestionListFocused(true);
      suggestionPanelRef.current?.focus();
    } else if (e.key === "Tab" && isSuggestionListFocused && e.shiftKey) {
      e.preventDefault();
      setIsSuggestionListFocused(false);
      searchBoxRef.current?.focus();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSuggestionListFocused]);

  const handleSearchResults = (movies: any[]) => {
    setSuggestions(movies);
  };

  const sanitizeFileName = (fileName: string) => {
    return fileName.replace(/[\/:*?"<>|]/g, "");
  };

  const escapeQuotes = (text: string) => {
    return text.replace(/"/g, '\\"').replace(/\n/g, "\\n");
  };

  const handleSelect = async (index: number) => {
    if (index < 0 || index >= suggestions.length) return;
    const selectedItem = suggestions[index];
    if (!selectedItem) return;

    try {
      // Determine if the selection is a movie or TV series
      const mediaType = selectedItem.type;
      const details =
        mediaType === "Movie"
          ? await TMDBApi.getMovieDetails(selectedItem.id, settings)
          : await TMDBApi.getTVDetails(selectedItem.id, settings);

      // Read the template content from the vault
      const templateFile = app.vault.getAbstractFileByPath(
        "Assets/Templates/Movie Template.md"
      ) as TFile;

      if (!templateFile) {
        throw new Error("Template file not found.");
      }

      const templateContent = await app.vault.read(templateFile);

      // Replace the placeholders with actual media details, escaping quotes where necessary
      const filledContent = templateContent
        .replace(
          /{{VALUE:Title}}/g,
          escapeQuotes(details.title || details.name)
        )
        .replace(/{{VALUE:Type}}/g, mediaType)
        .replace(
          /{{VALUE:Genre}}/g,
          escapeQuotes(
            details.genres.map((genre: any) => genre.name).join(", ")
          )
        )
        .replace(
          /{{VALUE:Released}}/g,
          escapeQuotes(details.release_date || details.first_air_date || "N/A")
        )
        .replace(
          /{{VALUE:Runtime}}/g,
          escapeQuotes(
            `${
              details.runtime || details.episode_run_time?.[0] || "N/A"
            } minutes`
          )
        )
        .replace(
          /{{VALUE:Director}}/g,
          escapeQuotes(
            details.credits?.crew?.find(
              (member: any) => member.job === "Director"
            )?.name || "N/A"
          )
        )
        .replace(
          /{{VALUE:Actors}}/g,
          escapeQuotes(
            details.credits?.cast
              ?.slice(0, 5)
              .map((actor: any) => actor.name)
              .join(", ")
          )
        )
        .replace(
          /{{VALUE:imdbRating}}/g,
          escapeQuotes(details.imdbRating?.toString() || "N/A")
        )
        .replace(/{{VALUE:Plot}}/g, escapeQuotes(details.overview || "N/A"))
        .replace(
          /{{VALUE:Poster}}/g,
          escapeQuotes(`https://image.tmdb.org/t/p/w500${details.poster_path}`)
        )
        .replace(
          /{{VALUE:Year}}/g,
          escapeQuotes(
            details.release_date?.split("-")[0] ||
              details.first_air_date?.split("-")[0] ||
              "N/A"
          )
        )
        .replace(
          /{{VALUE:Language}}/g,
          escapeQuotes(details.original_language || "N/A")
        )
        .replace(
          /{{VALUE:Country}}/g,
          escapeQuotes(
            details.production_countries
              ?.map((country: any) => country.name)
              .join(", ") || "N/A"
          )
        )
        .replace(
          /{{VALUE:imdbID}}/g,
          escapeQuotes(details.external_ids?.imdb_id || "N/A")
        );

      // Ensure the "Movies" folder exists before creating the note
      const moviesFolderPath = "Movies/MovieData";
      let moviesFolder = app.vault.getAbstractFileByPath(
        moviesFolderPath
      ) as TFolder;

      if (!moviesFolder) {
        moviesFolder = await app.vault.createFolder(moviesFolderPath);
      }

      // Sanitize the file name to remove illegal characters
      const sanitizedFileName = sanitizeFileName(details.title || details.name);

      // Create a new note in the "Movies" folder
      const newFile = await app.vault.create(
        `${moviesFolderPath}/${sanitizedFileName}.md`,
        filledContent
      );

      // Open the new note in the active leaf (current pane)
      const leaf = app.workspace.getLeaf(false);
      await leaf.openFile(newFile);

      // Close the modal after creating and opening the note
      closeModal();
    } catch (error) {
      console.error("Failed to fetch media details or create note:", error);
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";

      // Use Notice class directly from Obsidian
      new Notice(`❌ Failed to create movie note: ${errorMessage}`, 5000);

      closeModal();
    }
  };

  return (
    <div className="w-full h-full mt-2 max-h-[calc(100vh-10rem)]">
      <SearchBox
        inputRef={searchBoxRef}
        onSearchResults={handleSearchResults}
      />
      <SuggestionPanel
        suggestions={suggestions}
        onSelect={(index) => handleSelect(index)}
        isFocused={isSuggestionListFocused}
        ref={suggestionPanelRef}
      />
    </div>
  );
};

export default MoviewizModalContent;
