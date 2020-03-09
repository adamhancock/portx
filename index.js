const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const dnsResolves = require("./dnsResolves");
const hostCheck = require("./hostCheck");
const isIp = require("is-ip");

if (process.argv[2] == undefined) {
  console.log(
    chalk.red(
      "Please pass a JSON file path as a parameter. For example porttest.exe hosts.json"
    )
  );
  process.exit();
}

const hosts = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), process.argv[2]))
);

hosts.forEach(async host => {
  if (!isIp(host.host)) {
    const ipaddresses = await dnsResolves(host.host);
    if (ipaddresses.length == 0) {
      console.log(chalk.red(`${host.host} does not resolve`));
    } else {
      ipaddresses.forEach(async address => {
        console.log(
          await hostCheck({
            host: address,
            name: `${host.name} - ${host.host}`,
            port: host.port
          })
        );
      });
    }
  } else {
    console.log(
      await hostCheck({
        host: host.host,
        name: `${host.name} - ${host.host}`,
        port: host.port
      })
    );
  }
});
