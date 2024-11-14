/**
 * Search input component for MovieWiz
 *
 * This module provides the search functionality for movies and TV shows.
 * It handles user input with throttled API calls to prevent rate limiting
 * and manages the search results state.
 *
 * @component SearchBox
 */
import React, { useState } from "react";
import { Search } from "lucide-react";
import _ from "lodash";
import { TMDBApi } from "@/api/TMDBApi";
import { useSettings } from "@/contexts/GlobalContextProvider";

export const SearchBox = ({
  inputRef,
  onSearchResults,
}: {
  inputRef?: React.RefObject<HTMLInputElement>;
  onSearchResults?: (movies: any[]) => void;
}) => {
  const [query, setQuery] = useState("");
  const settings = useSettings();

  const handleSearchChange = _.throttle(async (query: string) => {
    if (query.trim() === "") {
      onSearchResults?.([]);
      return;
    }

    try {
      const movies = await TMDBApi.searchMovies(query, settings);
      onSearchResults?.(movies);
    } catch (error) {
      console.error("Error fetching data from TMDB", error);
    }
  }, 500); // Throttle API requests to once every 500ms

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    handleSearchChange(value);
  };

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="text"
        className="w-full myinput"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
      />
      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
    </div>
  );
};
