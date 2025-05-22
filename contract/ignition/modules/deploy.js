const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
module.exports = buildModule("FirstDemoTokenModule", (m) => {
  //deploy the FirstDAODemo with token's address
  const dao = m.contract("FirstDemoDAO")
  //deploy the FirstDAOToken firs with "dao address placeholder"
  const token = m.contract("FirstDemoToken", [dao])
  m.call(dao, "setToken", [token])

  return {dao, token}

});
