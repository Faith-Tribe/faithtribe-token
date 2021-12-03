require('dotenv').config();
const { expect } = require("chai");
const { ethers } = require("hardhat");
const BigNumber = require('bignumber.js');
BigNumber.config({ EXPONENTIAL_AT: 28 })

async function main() 
{
    const TOKENCONTRACT_NAME = "FaithTribe";
    const INITIAL_SUPPLY = new BigNumber("5000000000000000000000000000");
    let tx;

    signers= null;
    tokenContract = null;
    deployedTokenContract = null;    

    console.log("Deploying Faith Tribe contracts");

    signers = await ethers.getSigners();
    provider = ethers.getDefaultProvider();

    deployerSigner = signers[0];

    adminSignerAddress = '0x70997970c51812dc3a010c7d01b50e0d17dc79c8'; // mainnet: gnosis safe admin vault // testnets: 0xD24b8D8A65e0e55e64B7c9914db6F91D129aF28d // hardhat: 0x70997970c51812dc3a010c7d01b50e0d17dc79c8
    snapshortSignerAddress = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'; // mainnet - set to gnosis safe vault, testnet: 0x70997970c51812dc3a010c7d01b50e0d17dc79c8 - set to deployer (0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266)
    minterSignerAddress = '0x70997970c51812dc3a010c7d01b50e0d17dc79c8'; // as admin
    
    txnCount = await provider.getTransactionCount(signers[0].address);
    block = await provider.getBlock("latest");
    var gasLimit = block.gasLimit/block.transactions.length;

    console.log("Account:", deployerSigner.address);
    console.log("Account balance:", (await signers[0].getBalance()).toString());
    console.log("Gas Limit:", gasLimit);

    console.log("Admin signer: " + adminSignerAddress);
    console.log("Minter signer: " + minterSignerAddress);
    console.log("Deployer signer: " + deployerSigner.address);

    //let overrides = {
    //    gasPrice: 100,
    //    gasLimit: '0x1C950F4'
    //};

    console.log("Deploying Token contract");
    tokenContract = await ethers.getContractFactory(TOKENCONTRACT_NAME);
    console.log("...");
    
    deployedTokenContract = await tokenContract.deploy(INITIAL_SUPPLY.toString(), adminSignerAddress, snapshortSignerAddress, minterSignerAddress/*, overrides*/);

    await deployedTokenContract.deployed();
    console.log("Token Contract address:", deployedTokenContract.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
});
