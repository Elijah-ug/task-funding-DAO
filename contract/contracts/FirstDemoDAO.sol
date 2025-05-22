// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;
import "./FirstDemoToken.sol";
contract FirstDemoDAO{
    struct Task{
        string description;
        address assignedTo;
        uint256 reward;
        bool isCompleted;
        bool isPaid;
    }
    FirstDemoToken public token;
    address public owner;
    uint256 public taskCount;
    mapping(uint256 => Task) public tasks;
    mapping(address => uint256[]) public tasksByUser;
    mapping(uint256 => uint256) public doerRewards;
    mapping(uint256 => uint256) public daoRewards;


    modifier onlyOwner(){
        require(msg.sender == owner, "Not owner");
        _;
    }
    event TaskCreated(uint256 taskId, address assignedTo, uint256 reward);
    event TaskCompleted(uint256 taskId);
    event TaskRewarded(uint256 taskId, address to, uint256 amount);
    event TaskRewarded(uint256 taskId, address to, uint256 doerAmount, uint256 daoAmount);


    constructor(){
        owner = msg.sender;
    }

    function setToken(address _token) external onlyOwner(){
        require(address(token) == address(0), "Token alredy set");
        token = FirstDemoToken(_token);
    }

    function createTask(string calldata _description, address _assignedTo, uint256 _reward) external onlyOwner{
        tasks[taskCount] = Task(_description, _assignedTo, _reward, false, false);
        tasksByUser[_assignedTo].push(taskCount);
        taskCount ++;

        emit TaskCreated(taskCount, _assignedTo, _reward);
    }
    function markTaskAsCompleted(uint256 taskId) external{
        Task storage task = tasks[taskId];
        require(msg.sender == task.assignedTo, "Not assigned to");
        require(!task.isCompleted, "Task completed already");
        task.isCompleted = true;
        emit TaskCompleted(taskId);
    }

    function rewardTask(uint256 taskId) external onlyOwner{
        Task storage task = tasks[taskId];
        require(task.isCompleted, "Task not yet completed");
        require(!task.isPaid, "Already paid");
        task.isPaid = true;
        //split rewards
        uint256 rewardToDoer = (task.reward * 40) / 100;
        uint256 rewardToDAO = task.reward - rewardToDoer;
        // save on chain
        doerRewards[taskId] = rewardToDoer;
        daoRewards[taskId] = rewardToDAO;
        //reward
        token.mint(task.assignedTo, rewardToDoer);
        token.mint(owner, rewardToDAO);
        emit TaskRewarded(taskId, task.assignedTo, rewardToDoer);
        emit TaskRewarded(taskId, task.assignedTo, rewardToDoer, rewardToDAO);

    }
    //get all users' tasks
    function getAllTasksOfTheUser(address user) public view returns(Task[] memory){
        uint256[] memory ids = tasksByUser[user];
        Task[] memory results = new Task[](ids.length);
        for(uint256 i = 0; i < ids.length; i ++){
            results[i] = tasks[ids[i]];
        }
        return results;
    }
    //======get rewards function
    function getRewardSplits(uint256 taskId) public view returns(uint256 doerAmount, uint256 daoAmount){
        return (doerRewards[taskId], daoRewards[taskId]);
    }
}
