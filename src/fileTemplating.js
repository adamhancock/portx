// environment pass in for templating.
const Handlebars = require('handlebars')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')



module.exports = function (program) {
  if (program.version) {
    require('./checkVersion')()
    process.exit()
  }

  if (program.file == undefined && program.host == undefined) {
    console.log(chalk.red('No hosts specified.'))
    process.exit()
  }

  if (program.env) {
    const environments = program.env.split(',')
    const hosts = []
    environments.forEach((environment) => {
      const template = Handlebars.compile(
        fs.readFileSync(path.join(process.cwd(), program.file)).toString()
      )
      const templateResults = JSON.parse(
        template({
          env: environment,
        })
      )
      hosts.push(
        ...templateResults.map((result) => {
          return {
            ...result,
            env: environment,
          }
        })
      )
    })
    return hosts
  } else {
    // command line hosts
    if (program.host) {
      const host = program.host.split(':')[0]
      const port = program.host.split(':')[1]
      if (port == undefined) {
        console.log(
          chalk.red(`No port specified. Try again with portx -h ${host}:443`)
        )
        process.exit()
      }

      return [{
        host: host,
        port: port,
      }, ]
    } else {
      return JSON.parse(fs.readFileSync(path.join(process.cwd(), program.file)))
    }
  }
}
