const { expect } = require("chai");
const { ethers } = require("hardhat");
const BigNumber = require('bignumber.js');

BigNumber.config({ EXPONENTIAL_AT: 28 })

const TOKENCONTRACT_NAME = "FaithTribe";
const INITIAL_SUPPLY = new BigNumber("5e27");

provider = null;
signers = null;
adminSigner = null;
snapshotSigner = null;
minterSigner = null;
vendorSigner = null;

vendorContractFactory = null;
deployedTokenContract = null;
adminContractFactory = null;
adminContractRef = null;
snapshotContractFactory = null;
snapshotContractRef = null;
minterContractFactory = null;
minterContractRef = null;

describe("FaithTribe", () => {

  beforeEach(async () => {
    
    // get all signers needed for testing
    signers = await ethers.getSigners();
    vendorSigner = signers[0]; 
    adminSigner = signers[1];
    snapshotSigner = signers[2];
    minterSigner = signers[5];

    provider = ethers.getDefaultProvider();

    // deploy the ERC20 contract
//    console.log("Deploying contracts with the admin account:", adminSigner.address);
    vendorContractFactory = await ethers.getContractFactory(TOKENCONTRACT_NAME);
    deployedTokenContract = await vendorContractFactory.deploy(INITIAL_SUPPLY.toString(), adminSigner.address, snapshotSigner.address, minterSigner.address);
    await deployedTokenContract.deployed();
//    console.log("Contract deployed at:", deployedTokenContract.address);

    // set up references for all signers
    adminContractFactory = await vendorContractFactory.connect(adminSigner);
    adminContractRef = await adminContractFactory.attach(deployedTokenContract.address);
    snapshotContractFactory = await vendorContractFactory.connect(snapshotSigner);
    snapshotContractRef = await snapshotContractFactory.attach(deployedTokenContract.address);
    minterContractFactory = await vendorContractFactory.connect(minterSigner);
    minterContractRef = await minterContractFactory.attach(deployedTokenContract.address);

//    console.log("Minted Supply:", await deployedTokenContract.totalSupply().toString());
  });
  // mint
  it("constructor", async () => {
    // TODO Add a constructor check
  });
  // mint
  it("mint - totalSupply should match constructor", async () => {
    // mint the tokens
    await minterContractRef.mint();
  
    // check the supply
    const totalSupply = await deployedTokenContract.totalSupply();
//    console.log("Supply:", totalSupply.toString());
    expect(totalSupply.toString()).to.equal(INITIAL_SUPPLY.toString());

        // TODO Check tokens have been minted to the owner account
    //await expect(attackerContractRef.claim(TOKENS_TO_CLAIM)).to.be.revertedWith('caller does not have any tokens on hold');

  });
  it("mint - doublemint fail", async () => {
    // mint the tokens
    await minterContractRef.mint();
  
    // Try and mint again
    await expect(minterContractRef.mint()).to.be.revertedWith('ALREADY_MINTED_MAX_SUPPLY');
  });
  it("mint fail - no access", async () => {
    // Try and mint without access
    await expect(adminContractRef.mint()).to.be.revertedWith('AccessControl');
  });

  // snapshot
  it("snapshot success", async () => {
    // mint the tokens
    await minterContractRef.mint();
    
    // snapshot the token contract 
    await expect(snapshotContractRef.snapshot()).to.emit(snapshotContractRef, 'Snapshot');

  });
  it("snapshot fail - no access", async () => {
    // mint the tokens
    await minterContractRef.mint();

    await expect(minterContractRef.snapshot()).to.be.revertedWith('AccessControl');
  });
});