# MovieWiz - Obsidian Plugin

MovieWiz is an Obsidian plugin that helps users create structured notes for movies and TV shows using The Movie Database (TMDB) API. Built with React, TypeScript, and Tailwind CSS, it provides a modern, keyboard-friendly interface for searching and documenting media.

## Core Features

### Search Interface

- Accessible via command palette or hotkey (Ctrl/Cmd + Shift + M)
- Modal interface with search box and suggestion panel
- Real-time search results as you type
- Support for both movies and TV shows

### Suggestion Panel Display

Each suggestion includes:

- Movie/TV show poster thumbnail
- Title
- Release year
- Media type (Movie/TV)

### Keyboard Navigation

- Initial focus on search box
- Tab: Move focus to suggestion panel
- Shift + Tab: Return focus to search box
- Esc: Close modal
- When suggestion panel is focused:
  - j or ↓: Move selection down
  - k or ↑: Move selection up
  - Enter: Select current item
- Mouse support for selection and hover effects

### Note Creation

When a selection is made:

1. Fetches detailed information from TMDB API
2. Creates a new note in "Movies/MovieData" folder using the template below
3. Opens the new note automatically
4. Closes the modal interface

### Template Structure

```yaml
---
notetype: "moviedb"
status: "none"
title: "{{VALUE:Title}}"
type: "{{VALUE:Type}}"
genre: "{{VALUE:Genre}}"
released: "{{VALUE:Released}}"
runtime: "{{VALUE:Runtime}}"
director: "{{VALUE:Director}}"
actors: "{{VALUE:Actors}}"
imdbrating: "{{VALUE:imdbRating}}"
plot: "{{VALUE:Plot}}"
poster: "{{VALUE:Poster}}"
year: "{{VALUE:Year}}"
language: "{{VALUE:Language}}"
country: "{{VALUE:Country}}"
imdbid: "{{VALUE:imdbID}}"
banner: "{{VALUE:Poster}}"
banner_y: 0.36
season:
ep:
---
```

## Technical Implementation Details

### API Integration

- Primary data source: TMDB API
- Additional ratings from OMDB API
- Throttled API calls to prevent rate limiting
- Error handling with user-friendly notifications

### UI/UX Features

- Responsive modal design
- Blur effect backdrop
- Smooth keyboard navigation
- Visual feedback for selection and hover states
- Automatic focus management
- Error notifications using Obsidian's Notice API

### Data Processing

- Automatic sanitization of filenames
- Quote escaping in template values
- Global replacement of template variables
- Support for both movie and TV show data structures

### File Management

- Automatic creation of Movies/MovieData folder if not exists
- Safe file naming with illegal character removal
- Automatic note opening after creation

## Required Setup

1. Template file at: "Assets/Templates/Movie Template.md"
2. Write permissions for creating the Movies/MovieData folder
3. Valid TMDB API key configuration

## Error Handling

- User-friendly error notifications
- Graceful fallbacks for missing data
- Safe modal closure on errors
- Detailed console logging for debugging
