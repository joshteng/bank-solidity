# Bank

Just a sample project

## To run
First, set up your local node. Ganache is easiest.

Then
```
npm install
truffle migrate
```

Create `.env` file (a sample is available in `.env.sample`)
```
RPC_URL = "http://localhost:7545" # change this if necessary
BANK_CONTRACT = "" # fill in your bank contract address
LOG_CONTRACT = "" # fill in your log contract address
```

Run
```
npm run start
```

or

```
node bank.js
```

Web Interface
```
npm run app
```
