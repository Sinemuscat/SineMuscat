const PurchaseStuff = artifacts.require("PurchaseStuff");

module.exports = function(deployer) {
  deployer.deploy(PurchaseStuff, "0xBc4Bd93f1377672Bc7e01b771C2dD0A9c9F6C0a6", 25);
};
