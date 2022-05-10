# Authorization functional, API functional, save favorite

For correct build via Webpack you must have:

- nodejs >=16.13.1
- npm >= 7.10.0

This project have authorization and registration tool base via firebase platform.
After authentication this app is using free-api (https://alexwohlbruck.github.io/cat-facts/) that recieves random fact about cat. You can save any fact in "favorite facts". ID of favorite fact is saved in Realtime Database on your account. This allows to save space on Database.
In order to show Favorite facts, app uses api that downloads facts for ID.
Favorite facts have connection with realtime Database. It allows to add and delete favorite facts without refreshing page.

## Tech stack

- HTML
- CSS
- JavaScript
- React
- Redux
- Webpack
- Eslint
- Prettier

- firebase
- API (https://alexwohlbruck.github.io/cat-facts/)

## To start project in development mode:

- `npm install` - install necessary dependencies
- `npm start` - start "WebpackDevServer" on your computer

## To build project:

`npm run build` - build project in "production "mode.

## To deploy project to GitHub Pages

- `npm run deploy` - send directory `build` to GitHub Pages

 TESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTEST
