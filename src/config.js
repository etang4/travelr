require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'Travelr',
    description: 'The Traveler\'s Social Media',
    head: {
      titleTemplate: 'Travelr - %s',
      meta: [
        {name: 'description', content: 'The Traveler\'s Social Media'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'Travelr'},
        {property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: 'Travelr'},
        {property: 'og:description', content: 'The Traveler\'s Social Media'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@etang4'},
        {property: 'og:creator', content: '@etang4'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  },

}, environment);
