const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
module.exports = buildModule("FirstDemoTokenModule", (m) => {
  //deploy the FirstDAOToken firs with "dao address placeholder"
  const token = m.contract("FirstDemoToken", [m.getAccount(0)])
  //deploy the FirstDAODemo with token's address
  const dao = m.contract("FirstDemoDAO", [token])
  return {token, dao}

});
