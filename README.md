# Beer App

For correct build via Webpack you must have:

- nodejs >=16.13.1
- npm >= 7.10.0

This app allows users to register and log in, shows random beer from API, shows all beers list using lazy page loading and saves favorites for users.
For registration and log in the following tools were used: firebase/Authentication tool and Redux.
App uses free-api (https://punkapi.com/documentation/v2) that receives data about beer. You can receive random beer data, or review all beers list. "All beers" page uses lazy loading for saving resources.
You can save beer item to favorites. The app saves item data to firebase/Realtime Database on your user account.
Changes in Favorites are shown in real time. It allows to add and delete favorite data without refreshing page.

In project I used:

- Webpack to optimally bundle my project.
- Babel for React and as a compiler for js code for most browsers.
- Eslint and Prettier that analyze, format and fix my code.
- Husky that use git hooks for checking my code before committing.

## Tech stack

- HTML
- CSS/SCSS
- JavaScript
- React
- Redux
- Webpack
- Babel
- Eslint
- Prettier
- Husky

- firebase
- API (https://punkapi.com/documentation/v2)

## To start project in development mode:

- `npm install` - install necessary dependencies
- `npm start` - start "WebpackDevServer" on your computer

## To build project:

`npm run build` - build project in "production "mode.

## To deploy project to GitHub Pages

- `npm run deploy` - send directory `build` to GitHub Pages
