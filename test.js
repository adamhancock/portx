const Handlebars = require('handlebars')
const template = Handlebars.compile('Name: {{name}}')
console.log(template({ name: 'Nils' }))
