const dns = require("dns");
module.exports = async function(domain) {
  return new Promise((resolve, reject) => {
    dns.resolve4(domain, function(err, addresses) {
      if (err) {
        resolve([]);
      }
      // console.log(addresses);
      resolve(addresses);
    });
  });
};
