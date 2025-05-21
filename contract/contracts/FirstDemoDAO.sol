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

    modifier onlyOwner(){
        require(msg.sender == owner, "Not owner");
        _;
    }
    event TaskCreated(uint256 taskId, address assignedTo, uint256 reward);
    event TaskCompleted(uint256 taskId);
    event TaskRewarded(uint256 taskId, address to, uint256 amount);

    constructor(address _token){
        token = FirstDemoToken(_token);
        owner = msg.sender;
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
        token.mint(task.assignedTo, task.reward);
        emit TaskRewarded(taskId, msg.sender, task.reward);
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
}
