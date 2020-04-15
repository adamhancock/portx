const chalk = require("chalk");
const isPortReachable = require("is-port-reachable");
const httpCheck = require('./httpCheck')

module.exports = async function (host) {

  if (await isPortReachable(host.port, {
      host: host.host
    })) {
    const message = `* SUCCESS - ${host.name} - ${host.host}:${host.port} is accessible.`
    if (host.status) {
      return await chalk.green(await httpCheck(host, message))
    } else {
      return chalk.green(
        message
      )
    }
  } else {
    return chalk.red(
      `* FAIL - ${host.name} - ${host.host}:${host.port} is inaccessible.`
    );
  }
};
