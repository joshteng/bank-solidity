const bankAbi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "deposited",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "sent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "withdrew",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "logging",
    "outputs": [
      {
        "internalType": "contract LogInterface",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_logAddress",
        "type": "address"
      }
    ],
    "name": "setLogInterface",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "ownerAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "totalBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "deposit",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "withdraw",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdrawAll",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address payable",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address payable",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "send",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address payable",
        "name": "_send",
        "type": "address"
      }
    ],
    "name": "destruct",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

function getBankBalance() {
  const bankContract = new window.web3.eth.Contract(bankAbi, "0x89670662006E21bcBe5e926e1f5D6917c2225356")

  bankContract.methods.totalBalance().call().then((balance) => {
    document.getElementById('balance').innerHTML = window.web3.utils.fromWei(balance);
  })
}

function getUserBankBalance() {
  const bankContract = new web3.eth.Contract(bankAbi, "0x89670662006E21bcBe5e926e1f5D6917c2225356")

  bankContract.methods.balanceOf(window.ethereum.selectedAddress).call().then((balance) => {
    document.getElementById('user-bank-balance').innerHTML = window.web3.utils.fromWei(balance);
  })
}

async function deposit(amount) {
  const bankContract = new window.web3.eth.Contract(bankAbi, "0x89670662006E21bcBe5e926e1f5D6917c2225356")

  const account = window.ethereum.selectedAddress

  console.log(account)

  amount = new window.web3.utils.BN(web3.utils.toWei(amount.toString()))
  console.log(await bankContract.methods.deposit().send({
    from: account,
    value: new window.web3.utils.BN(amount.toString())
  }))
}

async function transfer(address, amount) {
  const bankContract = new window.web3.eth.Contract(bankAbi, "0x89670662006E21bcBe5e926e1f5D6917c2225356")

  const account = window.ethereum.selectedAddress

  console.log(account)

  amount = new window.web3.utils.BN(amount.toString())
  console.log(await bankContract.methods.transfer(address, amount).send({
    from: account
  }))
}



async function send(address, amount) {
  const bankContract = new window.web3.eth.Contract(bankAbi, "0x89670662006E21bcBe5e926e1f5D6917c2225356")

  const account = window.ethereum.selectedAddress

  console.log(account)

  amount = new window.web3.utils.BN(web3.utils.toWei(amount.toString()))
  console.log(await bankContract.methods.send(address, amount).send({
    from: account
  }))
}


const connectButton = document.getElementById('connect')

connectButton.addEventListener('click', async (event) => {
  // Modern dapp browsers...
  if (window.ethereum) {
    window.web3 = new Web3(ethereum);
    try {
      await ethereum.request({ method: 'eth_requestAccounts' });
      getUserBankBalance()
    } catch (error) {
      // User denied account access...
    }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    window.web3 = new Web3(web3.currentProvider);
    getUserBankBalance()
  }
  // Non-dapp browsers...
  else {
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
  }

  event.preventDefault();

});



document.getElementById('get-bank-balance').addEventListener('click', function (event) {

  getBankBalance()

  // Don't follow the link
  event.preventDefault();

}, false);

const transferForm = document.getElementById('transfer')

transferForm.addEventListener('submit', function (event) {
  const address = transferForm.querySelector('input[name="address"]').value
  const amount = transferForm.querySelector('input[name="amount"]').value
  transfer(address, amount)
  // Don't follow the link
  event.preventDefault();

}, false);

const sendForm = document.getElementById('send-balance')

sendForm.addEventListener('submit', function (event) {
  const address = sendForm.querySelector('input[name="address"]').value
  const amount = sendForm.querySelector('input[name="amount"]').value
  send(address, amount)
  // Don't follow the link
  event.preventDefault();

}, false);


const depositForm = document.getElementById('deposit')

depositForm.addEventListener('submit', function (event) {
  const amount = depositForm.querySelector('input[name="amount"]').value
  deposit(amount)
  // Don't follow the link
  event.preventDefault();

}, false);
