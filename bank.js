if (process.env.NODE_ENV !== "production") {
  require('dotenv').config()
}

const util = require('util')
const Web3 = require("web3")
const web3 = new Web3(process.env.RPC_URL)
const bankInterface = require('./build/contracts/Bank.json')
const logInterface = require('./build/contracts/Log.json')

const BN = web3.utils.BN;

async function main() {
  const networkId = await web3.eth.net.getId()
  const bankContractAddress = bankInterface.networks[networkId].address
  const logContractAddress = logInterface.networks[networkId].address
  const ganacheAccounts = await web3.eth.getAccounts();
  const myWalletAddress1 = ganacheAccounts[0];
  const myWalletAddress2 = ganacheAccounts[1];
  const myWalletAddress3 = ganacheAccounts[2];

  const bankContract = new web3.eth.Contract(bankInterface.abi, bankContractAddress)
  const logContract = new web3.eth.Contract(logInterface.abi, logContractAddress)

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
    from: myWalletAddress1,
    gasLimit: 130000
  })

  console.log(`Sent ${amountToSend} from ${myWalletAddress1} to ${myWalletAddress3}`)

  console.log(`Wallet 1 Balance: ${await bankContract.methods.balanceOf(myWalletAddress1).call()}`)
  console.log(`Wallet 3 Balance: ${await bankContract.methods.balanceOf(myWalletAddress3).call()}`)

  console.log(`Total Bank Balance: ${await bankContract.methods.totalBalance().call({
    from: myWalletAddress1
  })}`)

  const res = await logContract.methods.getRecord(0).call()

  console.log(`1st transaction log details: ${util.inspect(res, false, null, true)}`)
}

main()