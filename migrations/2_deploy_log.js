const Log = artifacts.require("Log");

module.exports = function (deployer) {
  deployer.deploy(Log);
};
