//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FirstDemoToken is ERC20{
    address public dao;
    modifier onlyDAO(){
        require(msg.sender == dao, "Not DAO");
        _;
    }
    constructor(address _dao) ERC20("Demo Token", "DTK"){
        dao = _dao;
    }
    function mint(address to, uint256 amount) external onlyDAO{
        _mint(to, amount);
    }
}
