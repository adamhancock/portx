const axios = require('axios')
const chalk = require('chalk')

module.exports = async function (host, message) {
  return await axios.get(`${host.status}://${host.host}:${host.port}`).then((res) => {
    return `${message} - HTTP: ${res.status} ${res.statusText}`
  }).catch((err) => {
    if (err.response) {
      return `${message} ` + chalk.red(`HTTP: ${err.response.status} ${err.response.statusText}`)
    } else {
      return `${message} ` + chalk.red(`HTTP connection error (Try with HTTP)`)
    }
  })

}
