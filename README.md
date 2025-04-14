
# Smart Contract for Storing Permission Logs on Chain

This repository contains a Solidity smart contract designed to store users’ permissions (and related metadata) on Binance Smart Chain (BSC). Each user’s data is stored as a JSON string, allowing you to include various fields (e.g., timestamps, status, etc.). The contract is **immutable** and **transparent**, letting you permanently keep a record of who has enabled or revoked permissions.

## Features

- **Stores JSON strings** in a mapping of `address => string`.
- **Emits an event** (`UserJSONSet`) whenever a user’s permissions data is updated.
- **Easily integrates** with web3 libraries like `ethers.js` for reading/writing data.
- **Verified on BscScan** for public audit and convenient “Read/Write Contract” interaction.

## Prerequisites

1. **Node.js** (v14+ recommended)
2. **Hardhat** or another Ethereum development framework
3. **BNB** for gas fees (Testnet or Mainnet)
4. **A wallet** with private key you can use for deployment

## Contract Overview

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract StorePermissions {
    mapping(address => string) private userJsonData;

    event UserJSONSet(address indexed user, string jsonData);

    function setUserData(address _user, string calldata _jsonString) external {
        userJsonData[_user] = _jsonString;
        emit UserJSONSet(_user, _jsonString);
    }

    function getUserData(address _user) external view returns (string memory) {
        return userJsonData[_user];
    }
}
```

- **`setUserData(address _user, string calldata _jsonString)`**  
  Stores any valid JSON string on-chain (for example, `{"permissions":"enabled","timestamp":"...","otherInfo":"..."}`) keyed by the user’s address.
- **`getUserData(address _user)`**  
  Returns the raw JSON string for that user’s address.

## Directory Structure

```
├─ contracts/
│   └─ StorePermissions.sol    # The primary Solidity contract
├─ scripts/
│   └─ deploy.js              # Hardhat script to deploy the contract
├─ test/
│   └─ StorePermissions.test.js # (Optional) Example tests
├─ hardhat.config.js
├─ package.json
├─ README.md
└─ .env  # (Ignored file containing private keys & config)
```

## How to Deploy

1. **Install Dependencies**
   ```bash
   npm install
   ```
2. **Update `.env`** with your private key and any other secrets:
   ```bash
   PRIVATE_KEY=0xyourPrivateKey
   ```
3. **Configure `hardhat.config.js`** with your BSC network settings:
   ```js
   require("dotenv").config();
   require("@nomicfoundation/hardhat-toolbox");

   module.exports = {
     solidity: "0.8.18",
     networks: {
       bsctest: {
         url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
         chainId: 97,
         accounts: [process.env.PRIVATE_KEY]
       },
       bscmain: {
         url: "https://bsc-dataseed.binance.org/",
         chainId: 56,
         accounts: [process.env.PRIVATE_KEY]
       }
     }
   };
   ```
4. **Compile & Deploy** to BSC Testnet (or Mainnet):
   ```bash
   npx hardhat compile
   npx hardhat run scripts/deploy.js --network bsctest
   ```
5. **Verify** the deployed contract on BscScan (optional but recommended):
   ```bash
   npx hardhat verify --network bsctest <DEPLOYED_CONTRACT_ADDRESS>
   ```

## Interacting With the Contract

### Using `ethers.js`

```js
import { ethers } from "ethers";

async function updatePermissions() {
  const provider = new ethers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545/");
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const abi = [
    "function setUserData(address _user, string _jsonString) external",
    "function getUserData(address _user) external view returns (string)",
    "event UserJSONSet(address indexed user, string jsonData)"
  ];

  const contractAddress = "0xYourDeployedContract";
  const contract = new ethers.Contract(contractAddress, abi, wallet);

  // Example JSON
  const jsonString = JSON.stringify({ permissions: "enabled", timestamp: new Date().toISOString() });

  // Post to chain
  const tx = await contract.setUserData("0xUserAddress", jsonString);
  console.log("Transaction:", tx.hash);
  await tx.wait();
  console.log("Permissions updated on-chain!");
}

// Then call updatePermissions() or use your own script
updatePermissions();
```


## License

This project is licensed under the [MIT License](LICENSE).
