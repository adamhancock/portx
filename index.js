const chalk = require('chalk')

const dnsResolves = require('./dnsResolves')
const hostCheck = require('./hostCheck')
const isIp = require('is-ip')

const fileTemplating = require('./fileTemplating')



if (process.argv[2] == undefined) {
  console.log(
    chalk.red(
      'Please pass a JSON file path as a parameter. For example porttest.exe hosts.json'
    )
  )
  process.exit()
}

const hosts = fileTemplating(process.argv)


hosts.forEach(async host => {
  if (host.env) {
    var env = `${host.env.toUpperCase() } -`
  } else {
    var env = ""
  }
  if (!isIp(host.host)) {
    const ipaddresses = await dnsResolves(host.host)
    if (ipaddresses.length == 0) {
      console.log(chalk.red(`${host.host} does not resolve`))
    } else {
      ipaddresses.forEach(async address => {
        console.log(
          await hostCheck({
            host: address,
            name: `${env} ${host.name} - ${host.host}`,
            port: host.port
          })
        )
      })
    }
  } else {
    console.log(
      await hostCheck({
        host: host.host,
        name: `${env} ${host.name} - ${host.host}`,
        port: host.port
      })
    )
  }
})
