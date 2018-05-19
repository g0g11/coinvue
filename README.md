<div align="center" style="color: black">
    <img src="https://github.com/g0g11/coinvue/blob/master/client/src/resources/logo_black.png"></img>
</div>

## About
Coinvue is a Crypto Currency portfolio manager that allows you to simply keep track on your Crypto Currencies. Coinvue has API-Integrations to automatically connect your Portfolio with different Exchanges and Wallets.

# Project

## Getting started
* Make sure you have an instance of [MongoDB](https://www.mongodb.com/) running or use a external Mongo Database Provider.
* Clone the repository with ``git clone <repository url>``
* Install the server dependencies and start the server
```
cd ./server
yarn install
nodemon index.js
```
* Install the client dependencies and start the client
```
cd ./client
yarn install
yarn start
```
* Create a ``.env`` file in the server root folder with the required keys. You can find an example in ``.env.example``.

## Screenshots
<div align="center">
    <img src="https://github.com/g0g11/coinvue/blob/master/client/src/resources/screens/portfolio_overview.png"></img>
    <img src="https://github.com/g0g11/coinvue/blob/master/client/src/resources/screens/currency_chart.png"></img>
</div>

## Tech Stack
* [React](https://reactjs.org/) - Front end library for building user interfaces
* [Redux](https://redux.js.org) - Storage to share data inside the app
* [Google API](https://developers.google.com/identity/sign-in/web/sign-in) - Login with Google
* [Node / Express](http://expressjs.com) - Back end web framework
* [MongoDB / Mongoose](http://mongoosejs.com/) - Database storage for Node

## Author
Goran Plavsic - [GitHub](https://github.com/g0g11) - [Linkedin](https://www.linkedin.com/in/goran-plavsic-70986a72/)
