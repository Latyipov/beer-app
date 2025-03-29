# 🍺 BeerFinder

**BeerFinder** is a full-featured web application built with React and TypeScript. It allows users to sign up, log in, explore beers from a public API, and save their favorites — all with real-time updates via Firebase. Designed with performance and user experience in mind, the app uses lazy loading, modern development tools, and state management with MobX.

---

## Live Demo

- **Deployed Version**: [GitHub Pages Link](https://latyipov.github.io/beer-app/)

---

## Features

- User authentication via **Firebase Authentication**
- Get a **random beer** or explore the **full beer list** using the [Sample APIs](https://sampleapis.com/)
- "All Beers" page uses **lazy loading** for performance optimization
- Save beers to your **favorites list**, stored in **Firebase Realtime Database**
- **Real-time updates** — changes to favorites appear instantly without page reload

---

## Tech Stack

- **React + TypeScript** — modern UI development
- **MobX** — state management
- **Webpack** — custom bundling setup
- **Babel** — transpilation for browser compatibility
- **SCSS** — modular and maintainable styles
- **Firebase** — authentication + real-time database
- **ESLint & Prettier** — code formatting and linting
- **Husky** — Git hooks for pre-commit code quality checks

---

## Requirements

- `Node.js >= 16.13.1`
- `npm >= 7.10.0`

---

## Getting Started

### To start project in development mode:

- `npm install` - install necessary dependencies
- `npm start` - start "WebpackDevServer" on your computer

### To build project:

- `npm run build` - build project in "production "mode.

### To deploy project to GitHub Pages

- `npm run deploy` - send directory `build` to GitHub Pages
