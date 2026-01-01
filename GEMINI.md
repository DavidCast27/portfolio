## Project Overview

This is a personal portfolio website built with [Astro](https://astro.build/), a web framework for building fast, content-focused websites. It uses [Preact](https://preactjs.com/) for UI components and [Tailwind CSS](https://tailwindcss.com/) for styling.

The project has a clear and organized structure, with components, layouts, and pages separated into their respective directories. It also includes internationalization (i18n) support, with English and Spanish translations.

## Building and Running

The following commands are available to run the project:

| Command | Description |
|---|---|
| `npm install` | Installs all the necessary dependencies to run the project. |
| `npm run dev` | Starts the development server at `localhost:4321`. |
| `npm run build` | Builds the project for production. The output is located in the `dist/` directory. |
| `npm run preview` | Starts a local server to preview the production build. |

## Development Conventions

*   **Components:** The project is built using a component-based architecture. Components are located in the `src/components` directory and are organized by feature.
*   **Styling:** The project uses Tailwind CSS for styling. Utility classes are used directly in the markup of the components.
*   **Internationalization:** The project uses the `i18n` module to provide translations for the content. The translation files are located in the `src/i18n` directory.
*   **Linting and Formatting:** The project uses `astro check` to check for errors and `prettier` for formatting. These are run automatically on build.
