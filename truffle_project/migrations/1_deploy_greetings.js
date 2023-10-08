const Greetings = artifacts.require("greetings");

module.exports = function (deployer) {
  deployer.deploy(Greetings);
};