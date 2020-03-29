const chalk = require("chalk");
const isPortReachable = require("is-port-reachable");

module.exports = async function(host) {
  if (await isPortReachable(host.port, { host: host.host })) {
    return chalk.green(
      `* SUCCESS - ${host.name} - ${host.host}:${host.port} is accessible.`
    );
  } else {
    return chalk.red(
      `* FAIL - ${host.name} - ${host.host}:${host.port} is inaccessible.`
    );
  }
};
