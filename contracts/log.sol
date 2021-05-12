pragma solidity ^0.7.4;

contract Log {
    struct Transaction {
        address from;
        address to;
        uint256 amount;
    }

    Transaction[] public transactions;

    function record(
        address from,
        address to,
        uint256 amount
    ) external {
        transactions.push(Transaction(from, to, amount));
    }

    function getRecord(uint256 _index)
        public
        view
        returns (
            address,
            address,
            uint256
        )
    {
        Transaction memory txn = transactions[_index];

        return (txn.from, txn.to, txn.amount);
    }
}
