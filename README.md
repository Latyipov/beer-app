# Authorization functional, API functional, save favorite

For correct build via Webpack you must have:

- nodejs >=16.13.1
- npm >= 7.10.0

This project have authorization and registration tool base via firebase platform.
After authentication this app is using free-api (https://punkapi.com/documentation/v2) that recieves random name and some data about beer. If you like some beer you can save it to favorite. Data about beer is saved in Realtime Database on your account.
Favorite table listen data from firebase and showing changing in real time. It allows to add and delete favorite facts without refreshing page.

## Tech stack

- HTML
- CSS
- JavaScript
- React
- Redux
- Webpack
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
