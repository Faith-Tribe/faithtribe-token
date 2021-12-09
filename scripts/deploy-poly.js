require('dotenv').config();
const { expect } = require("chai");
const { ethers } = require("hardhat");
const BigNumber = require('bignumber.js');
BigNumber.config({ EXPONENTIAL_AT: 28 })

async function main() 
{
    const TOKENCONTRACT_NAME = "ChildFaithTribe";
    const TOKEN_NAME = "Faith Tribe";
    const TOKEN_SYMBOL = "FTRB";
    let tx;

    signers= null;
    tokenContract = null;
    deployedTokenContract = null;    

    console.log("Deploying Faith Tribe contracts");

    signers = await ethers.getSigners();
    provider = ethers.getDefaultProvider();

    deployerSigner = signers[0];

    adminSignerAddress = '0xD24b8D8A65e0e55e64B7c9914db6F91D129aF28d'; // mainnet: set to gnosis safe vault, testnet: 0xD24b8D8A65e0e55e64B7c9914db6F91D129aF28d
    snapshotSignerAddress = '0xD24b8D8A65e0e55e64B7c9914db6F91D129aF28d'; // mainnet: set to gnosis safe vault, testnet: 0xD24b8D8A65e0e55e64B7c9914db6F91D129aF28d
    childManagerProxyAddress = '0xb5505a6d998549090530911180f38aC5130101c6'; // mainnet: 0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa // mumbai: 0xb5505a6d998549090530911180f38aC5130101c6

    txnCount = await provider.getTransactionCount(signers[0].address);
    block = await provider.getBlock("latest");
    var gasLimit = block.gasLimit/block.transactions.length;

    console.log("Account:", deployerSigner.address);
    console.log("Account balance:", (await signers[0].getBalance()).toString());
    console.log("Gas Limit:", gasLimit);

    console.log("Admin signer: " + adminSignerAddress);
    console.log("Snapshot signer: " + snapshotSignerAddress);
    console.log("Deployer signer: " + deployerSigner.address);
    console.log("Child Manager proxy address: " + childManagerProxyAddress);

    //let overrides = {
    //    gasPrice: 100,
    //    gasLimit: '0x1C950F4'
    //};

    console.log("Deploying Token contract");
    tokenContract = await ethers.getContractFactory(TOKENCONTRACT_NAME);
    console.log("...");
    
    deployedTokenContract = await tokenContract.deploy(TOKEN_NAME, TOKEN_SYMBOL, adminSignerAddress, snapshotSignerAddress, childManagerProxyAddress, /*, overrides*/);

    await deployedTokenContract.deployed();
    console.log("Token Contract address:", deployedTokenContract.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
});
