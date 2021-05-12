if (process.env.NODE_ENV !== "production") {
  require('dotenv').config()
}

const Web3 = require("web3");
const web3 = new Web3(process.env.RPC_URL);
const bankAbi = require('./build/contracts/Bank.json').abi
const logAbi = require('./build/contracts/Log.json').abi

const BN = web3.utils.BN;

async function main() {
  const bankContractAddress = process.env.BANK_CONTRACT
  const logContractAddress = process.env.LOG_CONTRACT
  const ganacheAccounts = await web3.eth.getAccounts();
  const myWalletAddress1 = ganacheAccounts[0];
  const myWalletAddress2 = ganacheAccounts[1];
  const myWalletAddress3 = ganacheAccounts[2];

  const bankContract = new web3.eth.Contract(bankAbi, bankContractAddress)

  await bankContract.methods.setLogInterface(logContractAddress).send({
    from: myWalletAddress1
  })

  console.log(`Log contract: ${await bankContract.methods.logging().call()}`)

  console.log(`Wallet 1 Balance: ${await bankContract.methods.balanceOf(myWalletAddress1).call()}`)

  await bankContract.methods.deposit().send({
    from: myWalletAddress1,
    value: new BN(web3.utils.toWei("1"))
  })

  console.log(`Deposited 1 from wallet 1`)

  await bankContract.methods.deposit().send({
    from: myWalletAddress2,
    value: new BN(web3.utils.toWei("1"))
  })

  console.log(`Deposited 1 from wallet 2`)

  console.log(`Wallet 1 Balance: ${await bankContract.methods.balanceOf(myWalletAddress1).call()}`)
  console.log(`Wallet 2 Balance: ${await bankContract.methods.balanceOf(myWalletAddress2).call()}`)
  console.log(`Wallet 3 Balance: ${await bankContract.methods.balanceOf(myWalletAddress3).call()}`)

  const amountToSend = new BN(web3.utils.toWei("1"))
  await bankContract.methods.transfer(myWalletAddress3, amountToSend).send({
    from: myWalletAddress1
  })

  console.log(`Sent ${amountToSend} from ${myWalletAddress1} to ${myWalletAddress3}`)

  console.log(`Wallet 1 Balance: ${await bankContract.methods.balanceOf(myWalletAddress1).call()}`)
  console.log(`Wallet 3 Balance: ${await bankContract.methods.balanceOf(myWalletAddress3).call()}`)

  console.log(`Total Bank Balance: ${await bankContract.methods.totalBalance().call({
    from: myWalletAddress1
  })}`)

  const logContract = new web3.eth.Contract(logAbi, logContractAddress)

  console.log(`1st transaction log details: ${await logContract.methods.getRecord(0).call()}`)
}

main()