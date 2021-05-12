pragma solidity ^0.7.4;

import "./ownable.sol";

interface LogInterface {
    function record(
        address from,
        address to,
        uint256 amount
    ) external;
}

contract Bank is Ownable {
    LogInterface public logging;

    mapping(address => uint256) balances;

    event deposited(address from, uint256 amount);
    event withdrew(address to, uint256 amount);
    event transferred(address from, address to, uint256 amount);
    event sent(address from, address to, uint256 amount);

    function setLogInterface(address _logAddress) public onlyOwner {
        logging = LogInterface(_logAddress);
    }

    function ownerAddress() public view onlyOwner returns (address) {
        return owner;
    }

    function totalBalance() public view onlyOwner returns (uint256) {
        return address(this).balance;
    }

    function balanceOf(address _address) public view returns (uint256) {
        return balances[_address];
    }

    function deposit() public payable returns (uint256) {
        balances[msg.sender] += msg.value;
        emit deposited(msg.sender, msg.value);
        return balances[msg.sender];
    }

    function withdraw(uint256 _amount) public returns (uint256) {
        require(balanceOf(msg.sender) >= _amount, "Insufficient balance");

        balances[msg.sender] -= _amount;
        msg.sender.transfer(_amount);

        emit withdrew(msg.sender, _amount);
        return balances[msg.sender];
    }

    function withdrawAll() public returns (uint256) {
        uint256 _totalDeposits = balances[msg.sender];
        balances[msg.sender] -= _totalDeposits;
        msg.sender.transfer(_totalDeposits);

        emit withdrew(msg.sender, _totalDeposits);
        return balances[msg.sender];
    }

    function transfer(address payable _to, uint256 _amount)
        public
        returns (uint256)
    {
        require(balanceOf(msg.sender) >= _amount, "Insufficient balance");

        balances[msg.sender] -= _amount;
        balances[_to] += _amount; // transferring only to _to's bank balance not to wallet

        logging.record(msg.sender, _to, _amount); // this not working

        emit transferred(msg.sender, _to, _amount);
        return balances[msg.sender];
    }

    function send(address payable _to, uint256 _amount)
        public
        returns (uint256)
    {
        require(balanceOf(msg.sender) >= _amount, "Insufficient balance");

        balances[msg.sender] -= _amount;
        _to.transfer(_amount); // transferring to _to's wallet

        logging.record(msg.sender, _to, _amount);

        emit sent(msg.sender, _to, _amount);
        return balances[msg.sender];
    }

    function destruct(address payable _send) public onlyOwner {
        selfdestruct(_send);
    }
}
