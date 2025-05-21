import { expect } from "chai"
import { ethers } from "hardhat"
describe("FirstDemoDAO", () => {
  let token, dao, owner, user;

  beforeEach(async () => {
    //get test accounts
    [owner, user] = await ethers.getSigners();
    //get the contract factories
    const TokenFactory = await ethers.getContractFactory("FirstDemoToken")
    const DAOFactory = await ethers.getContractFactory("FirstDemoDAO")
    //deploy the token and wait for it to be mined
    token = await TokenFactory.deploy(owner.address);
    await token.waitForDeployment();
    //deploy the DAO and pass in the token address
    dao = await DAOFactory.deploy(await token.target);
    await dao.waitForDeployment();
  })

  it("Should create a task and asign it", async () => {
    await dao.connect(owner).createTask("Fix a bug", user.target, 1000);
    const task = await dao.tasks(0);
    expect(task.description).to.equal("Fix a bug");
    expect(task.assignedTo), to.equal(user.address);
    expect(task.reward).to.equal(1000);
  })

  it("Should mark tasks as complete", async () => {
    await dao.connect(owner).createTask("Fix a bug", user.target, 1000);
    await dao.connect(user).markTaskAsCompleted(0)
    const task = await dao.tasks(0);
    expect(task.isComplete).to.be.true;
  })

  it("Should reward tasks", async () => {
    await dao.connect(owner).createTask("Fix a bug", user.target, 1000);
    await dao.connect(user).markTaskAsCompleted(0);
    await dao.connect(owner).rewardTask(0);

    expect(await token.balanceOf(user.address)).to.equal(1000);
  })

})
