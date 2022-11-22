# Authorization functional, API functional, save favorite

For correct build via Webpack you must have:

- nodejs >=16.13.1
- npm >= 7.10.0

This app can authenticates users, shows random beer from API, shows all beers list using lazy page loading and saves favorites for users without a refresh page
This App can authenticate and registers users via firebase/Authentication tool and Redux.
App used free-api (https://punkapi.com/documentation/v2) that receives data about beer. You can receive random beer data, or looking all beers list. "All beers" page used lazy loading for saving resources.
You can save beer item to favorite. App saving item data to firebase/Realtime Database on your user account.
Favorite data listening and showing changing in real time. It allows to add and delete favorite data without refreshing page.

In project I use:

- Webpack to optimal bundle my project.
- Babel for developed on React and compile js code for most browsers.
- Eslint and Prettier that analyze, formatting and fixing my code.
- Husky that using git hooks for checking my code before commit.

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
