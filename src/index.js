#!/usr/bin/env node

const chalk = require('chalk')
const dnsResolves = require('./dnsResolves')
const hostCheck = require('./hostCheck')
const isIp = require('is-ip')
const program = require('commander')
const fileTemplating = require('./fileTemplating')

program
  .option('-e, --env <String>', 'environment templating')
  .option('-f, --file <String>', 'file based')
  .option('-h, --host <String>', 'host based')
  .option('-s, --status [type]', 'http status code')
  .option('-v, --version', 'Check version', false)

program.parse(process.argv)

const hosts = fileTemplating(program)

hosts.forEach(async (host) => {
  if (host.env) {
    var env = `${host.env.toUpperCase()} -`
  } else {
    var env = ''
  }
  if (host.name) {
    host.name = ' ' + host.name + ' - '
  } else {
    host.name = ''
  }
  if (!isIp(host.host)) {
    const ipaddresses = await dnsResolves(host.host)
    if (ipaddresses.length == 0) {
      console.log(
        chalk.red(`* FAIL - ${env}${host.name}${host.host} does not resolve`)
      )
    } else {
      ipaddresses.forEach(async (address) => {
        console.log(
          await hostCheck({
            host: address,
            name: `${env}${host.name}${host.host}`,
            port: host.port,
            status: program.status || false,
          })
        )
      })
    }
  } else {
    console.log(
      await hostCheck({
        host: host.host,
        name: `${env} ${host.name}${host.host}`,
        port: host.port,
        status: program.status || false,
      })
    )
  }
})
