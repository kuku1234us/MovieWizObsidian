/**
 * TMDB API integration module
 *
 * This module handles all interactions with The Movie Database (TMDB) API.
 * It provides methods for searching movies/TV shows and fetching detailed
 * information. It also includes integration with the OMDB API for additional
 * movie ratings data.
 *
 * Features:
 * - Movie and TV show search
 * - Detailed information retrieval
 * - IMDb ratings integration
 * - Error handling for API requests
 *
 * @module TMDBApi
 */
import axios from "axios";

const TMDB_API_KEY = "replace_with_your_key";
const OMDB_API_KEY = "replace_with_your_key";

export class TMDBApi {
  static async searchMovies(query: string) {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/multi`,
      {
        params: {
          api_key: TMDB_API_KEY,
          query,
        },
      }
    );
    return response.data.results
      .filter(
        (result: any) =>
          result.media_type === "movie" || result.media_type === "tv"
      )
      .map((result: any) => ({
        id: result.id,
        title: result.title || result.name, // `title` for movies, `name` for TV shows
        year: result.release_date
          ? result.release_date.split("-")[0]
          : result.first_air_date
          ? result.first_air_date.split("-")[0]
          : "Unknown",
        poster: result.poster_path
          ? `https://image.tmdb.org/t/p/w92${result.poster_path}`
          : "https://via.placeholder.com/92x138.png?text=No+Image",
        type: result.media_type === "movie" ? "Movie" : "TV",
      }));
  }

  static async getMovieDetails(movieId: string) {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}`,
      {
        params: {
          api_key: TMDB_API_KEY,
          append_to_response: "external_ids,credits",
        },
      }
    );
    const movieDetails = response.data;

    // Get IMDb rating from OMDb API if imdb_id is available
    if (movieDetails.external_ids?.imdb_id) {
      const omdbRating = await TMDBApi.getOMDbRating(
        movieDetails.external_ids.imdb_id
      );
      return { ...movieDetails, imdbRating: omdbRating };
    }

    return movieDetails;
  }

  static async getTVDetails(tvId: string) {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${tvId}`,
      {
        params: {
          api_key: TMDB_API_KEY,
          append_to_response: "external_ids,credits",
        },
      }
    );
    const tvDetails = response.data;

    // Get IMDb rating from OMDb API if imdb_id is available
    if (tvDetails.external_ids?.imdb_id) {
      const omdbRating = await TMDBApi.getOMDbRating(
        tvDetails.external_ids.imdb_id
      );
      return { ...tvDetails, imdbRating: omdbRating };
    }

    return tvDetails;
  }

  static async getOMDbRating(imdbId: string) {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?i=${imdbId}&apikey=${OMDB_API_KEY}`
      );
      return response.data.imdbRating || "N/A";
    } catch (error) {
      console.error("Failed to fetch IMDb rating:", error);
      return "N/A";
    }
  }
}