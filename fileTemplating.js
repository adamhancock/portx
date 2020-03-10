// environment pass in for templating.
const Handlebars = require('handlebars')
const program = require('commander')
const fs = require('fs')
const path = require('path')
program.option('-e, --env <List>', 'environment templating')
program.parse(process.argv)

module.exports = function () {
  if (program.env) {
    const environments = program.env.split(',')
    const hosts = []
    environments.forEach(environment => {

      const template = Handlebars.compile(
        fs.readFileSync(path.join(process.cwd(), process.argv[2])).toString()
      )
      const templateResults = JSON.parse(template({
        env: environment
      }))
      hosts.push(...templateResults.map((result) => {
        return {
          ...result,
          env: environment
        }
      }))


    });
    return hosts

  } else {
    return JSON.parse(
      fs.readFileSync(path.join(process.cwd(), process.argv[2]))
    )
  }
}
