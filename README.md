# Forkify

A recipe application built with JavaScript, Vite, Sass, and the Forkify API.

Forkify lets users search for recipes, view recipe details, adjust servings, bookmark recipes, and upload their own recipes.

## Features

- Search for recipes using the Forkify API
- View recipe details and ingredients
- Adjust ingredient quantities based on the number of servings
- Bookmark and remove recipes
- Persist bookmarks using Local Storage
- Browse search results using pagination
- Upload custom recipes
- Update the URL based on the current recipe
- Responsive interface
- Modular JavaScript architecture
- Production builds with Vite

## Tech Stack

- HTML5
- Sass
- JavaScript (ES6+)
- Vite
- Forkify API
- pnpm
- Git & GitHub

## Project Structure

```text
forkify-app/
│
├── src/
│   ├── img/
│   │   ├── favicon.png
│   │   ├── icons.svg
│   │   └── logo.png
│   │
│   ├── js/
│   │   ├── views/
│   │   │   ├── View.js
│   │   │   ├── addRecipeView.js
│   │   │   ├── bookmarkView.js
│   │   │   ├── paginationView.js
│   │   │   ├── previewView.js
│   │   │   ├── recipeView.js
│   │   │   ├── resultView.js
│   │   │   └── searchView.js
│   │   │
│   │   ├── config.js
│   │   ├── controller.js
│   │   ├── helper.js
│   │   └── model.js
│   │
│   └── sass/
│       ├── _base.scss
│       ├── _components.scss
│       ├── _header.scss
│       ├── _preview.scss
│       ├── _recipe.scss
│       ├── _searchResults.scss
│       ├── _upload.scss
│       └── main.scss
│
├── index.html
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── vite.config.mjs
└── README.md
```

## Architecture

The application is organized around three main parts:

```text
User
  │
  ▼
Views
  │
  ▼
Controller
  │
  ├──────────────► Model
  │                  │
  │                  ▼
  │             Forkify API
  │
  └──────────────► Views
```

### Model

Handles application data and communication with the Forkify API.

It is responsible for things such as:

- Loading recipes
- Loading recipe details
- Uploading recipes
- Managing bookmarks
- Updating recipe data

### Views

The views are responsible for rendering and updating the user interface.

Examples include:

- Search results
- Recipe details
- Pagination
- Bookmarks
- Recipe previews
- Add recipe form

### Controller

The controller connects user interactions with the model and views.

It coordinates operations such as:

- Searching for recipes
- Loading a selected recipe
- Updating the UI
- Changing servings
- Adding and removing bookmarks
- Uploading recipes

## Getting Started

### Prerequisites

Make sure you have Node.js and pnpm installed.

Check your versions:

```bash
node --version
pnpm --version
```

### Installation

Clone the repository:

```bash
git clone https://github.com/Omar-Rifaiy/forkify-app.git
```

Move into the project directory:

```bash
cd forkify-app
```

Install the dependencies:

```bash
pnpm install
```

## Development

Start the development server:

```bash
pnpm run dev
```

Vite will start the application using the development configuration.

## Production Build

Create a production build:

```bash
pnpm run build
```

The generated files are placed inside:

```text
dist/
```

To preview the production build locally:

```bash
pnpm run preview
```

## Available Scripts

| Command            | Description                  |
| ------------------ | ---------------------------- |
| `pnpm run dev`     | Start the development server |
| `pnpm run build`   | Create a production build    |
| `pnpm run preview` | Preview the production build |

## Environment Variables

Environment-specific configuration is kept outside the repository.

Create a local `.env` file when required by the application:

```env
YOUR_VARIABLE=your_value
```

Environment files are excluded from Git using `.gitignore`.

Do not commit API keys or other sensitive values to the repository.

## Git Workflow

The project is managed using Git and GitHub.

The intended workflow is:

```text
Feature Branch
      │
      ▼
    Commit
      │
      ▼
    GitHub
      │
      ▼
 Pull Request
      │
      ▼
   Review
      │
      ▼
    main
```

Production deployment will be connected to the `main` branch.

## Deployment

The application is intended to be deployed through Vercel.

The deployment workflow will be:

```text
Local Development
       │
       ▼
     Git
       │
       ▼
    GitHub
       │
       ▼
     Vercel
       │
       ├── Preview Deployments
       │
       └── Production
```

## What I'm Learning

This project is part of my JavaScript development journey.

While building it, I'm working with:

- Modern JavaScript
- ES Modules
- Asynchronous JavaScript
- Promises
- `async/await`
- Fetch API
- REST APIs
- DOM manipulation
- Event handling
- Event delegation
- Local Storage
- URL and browser history APIs
- MVC architecture
- Application state
- Object-oriented JavaScript
- Sass
- Vite
- Git
- GitHub
- Deployment workflows

The project will continue to evolve as I apply new concepts and improve the architecture.

## Author

**Omar Rifai**

GitHub: [@Omar-Rifaiy](https://github.com/Omar-Rifaiy)
