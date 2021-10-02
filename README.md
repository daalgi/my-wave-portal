# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

Deploy to a live testnet (Rinkeby)
```shell
npx hardhat run scripts/deploy.js --network rinkeby
```

- v0: Rinkeby testnet contract address:
```0x382d4d13b4633333188C0c291877c67ABD0139FB```
https://rinkeby.etherscan.io/address/0x382d4d13b4633333188C0c291877c67ABD0139FB

- v1: Rinkeby testnet contract address:
```0x7591Eed2559020620a34bdd1A449721A40f2aE88```
https://rinkeby.etherscan.io/address/0x7591Eed2559020620a34bdd1A449721A40f2aE88

Replit project
https://replit.com/@DavidAG2/waveportal-baseline-student#README.md

After deploying (or re-deploying) a contract, you must update the front-end:
- contractAddress
- abi (json file of the contract within the `artifacts` folder)