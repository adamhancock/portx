const axios = require('axios')
const chalk = require('chalk')

module.exports = async function (host, message) {
  let protocol = 'http'
  if (host.status == undefined || host.status == true) {
    protocol = 'http'
  } else {
    protocol = host.status
  }
  let hostHeader = {
    Host: host.name
  };

  return await axios.get(`${protocol}://${host.host}:${host.port}`, {
    headers: hostHeader
  }).then((res) => {
    return `${message} HTTP: ${res.status} ${res.statusText}`
  }).catch((err) => {
    if (err.response) {
      return `${message} ` + chalk.red(`HTTP: ${err.response.status} ${err.response.statusText}`)
    } else {
      return `${message} ` + chalk.red(`HTTP connection error (Try with HTTP)`)
    }
  })

}
