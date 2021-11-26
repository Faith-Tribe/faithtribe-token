# faithtribe-token
 Contract for the Faith Tribe Token

**Pre-requisities**
* npm installed
* hardhat installed

**Set Up**
1. Create secrets.json file (this is already added to .gitignore)
```
    {
        "key": "privatekey for deployer account",
        "rpcAPIKey": "Eth RPC API Key",
        "etherscanKey": "Etherescan API key"
    }
```

**Compile and Local Testing**
1. To build
```
npm run build 
```

2. To Test locally
```
npm run test
```

**Network Deployment**
1. Modify the deployment script to set the admin, snapshot, and minter signer addresses
```
    adminSignerAddress = 'INSERYOURADDRESSHERE'; 
    snapshortSignerAddress = 'INSERYOURADDRESSHERE'; 
    minterSignerAddress = 'INSERYOURADDRESSHERE'; 
```

2. To deploy (to rinkeby)
```
    npm run deploy:rinkeby
```

3. To verify

Modify the package.json with addresses and constructor params
```
    "verify-token:rinkeby": "hardhat verify --network rinkeby TOKENADDRESS 0x1027E72F1F12813088000000 ADMINADDRESS SNAPSHOTADDRESS MINTERADDRESS"
```

Run
```
    npm run verify-token:rinkeby
```

* To mint the tokens, call mint() on the token contract from the minterAddress provided in the deploy script.

