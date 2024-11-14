# MovieWiz - An Obsidian Plugin for Movie and TV Lovers

MovieWiz is a powerful Obsidian plugin that lets you easily search for movies and TV series from The Movie Database (TMDB), retrieve detailed information, and create organized notes for your collection. The plugin is designed for movie enthusiasts who love keeping track of the films and shows they watch or want to watch, all within the comfort of Obsidian's interface.

## Features

- **Quick Search**: Use the `Ctrl+Shift+M` command to open MovieWiz and start searching for your favorite movies or TV series.
- **Live Suggestions**: The search box provides suggestions as you type, displaying movie posters, titles, years, and other relevant information.
- **TMDB Integration**: Retrieve information such as movie title, release date, director, actors, runtime, genres, and more from TMDB.
- **Customizable Notes**: Automatically create a well-formatted note for each movie/TV series, using a custom template that you can edit.
- **Keyboard Navigation**: Navigate through the suggestion list using `j` (down) and `k` (up), and select items with `Enter`.
- **Cross-Device Compatibility**: Enjoy the plugin's functionality across desktop and mobile devices (subject to certain limitations).

## Installation

### Manual Installation

1. **Download the Plugin**: [Download the latest release](https://github.com/yourusername/MovieWiz/releases).
2. **Install in Obsidian**:
   - Extract the contents of the downloaded `.zip` file.
   - Place the extracted folder in your Obsidian vault under `.obsidian/plugins/`.
3. **Enable the Plugin**:
   - Open Obsidian, go to `Settings` > `Community Plugins`.
   - Locate `MovieWiz` in the list and enable it.

### Install via BRAT (Beta Reviewer's Auto-update Tool)

If you're a BRAT user, you can easily install and keep MovieWiz updated:

- Run the BRAT command to add MovieWiz to your beta plugins list and automatically install it.

## Usage

1. **Open MovieWiz**: Press `Ctrl+Shift+M` (or `Cmd+Shift+M` on macOS) to open the MovieWiz modal.
2. **Search for a Movie or TV Show**: Start typing the movie title, IMDb ID, or any related keyword.
3. **View Suggestions**: MovieWiz will display suggestions, including posters, release year, and type (Movie or TV Series).
4. **Select and Create a Note**:
   - Use `Tab` to navigate to the suggestion list.
   - Press `j` or `ArrowDown` to move down the list and `k` or `ArrowUp` to move up.
   - Press `Enter` to create a note for the selected item.
5. **View the Note**: The created note is saved in the `Movies` folder of your vault, containing all relevant movie details.

## Custom Template

The plugin uses a customizable note template located at:

```
Assets/Templates/Movie Template.md
```

Feel free to modify the template to include additional fields or format it according to your personal preferences.

## Requirements

- **Obsidian v0.13.0+**
- **TMDB API Key**: You will need a valid TMDB API key to use MovieWiz. You can obtain an API key from [The Movie Database website](https://www.themoviedb.org/).
- (Optional) **OMDb API Key**: If you want to fetch IMDb ratings, you will need a valid OMDb API key.

## Known Issues

- **Mobile Compatibility**: MovieWiz is designed to be cross-device compatible, but certain mobile behaviors may differ, such as keyboard navigation issues.
- **Style Conflicts**: Obsidian's default styles can sometimes conflict with MovieWiz styling. A CSS reset or scoped styling may be needed if you encounter issues.

## Troubleshooting

- **Plugin Fails to Load**: If the plugin fails to load on iOS devices, you can debug using **Safari Remote Debugging** on macOS to view console logs from your iPhone.
- **API Key Issues**: Ensure that your TMDB API key is valid and has sufficient permissions to fetch movie/TV details.

## Contribution

We welcome contributions! Feel free to fork the repository and submit pull requests to add new features or improve existing ones.

1. **Clone the Repository**:
   ```sh
   git clone https://github.com/yourusername/MovieWiz.git
   ```
2. **Install Dependencies**:
   ```sh
   npm install
   ```
3. **Build the Plugin**:
   ```sh
   npm run build
   ```

## License

MovieWiz is licensed under the [MIT License](LICENSE).

## Credits

- **TMDB**: MovieWiz uses the TMDB API for retrieving movie and TV information.
- **Obsidian**: Built as a plugin for the Obsidian note-taking app.
- **React, Tailwind CSS**: Built using React and styled using Tailwind CSS.

## Support

If you encounter any issues or have questions, please feel free to open an issue on the [GitHub repository](https://github.com/yourusername/MovieWiz/issues).

Happy movie tracking! 🍿🎬
