# Contract structure

```
contract Greeter {
    string private greeting;

    constructor(string memory _greeting) {
        greeting = _greeting;
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        greeting = _greeting;
    }
}
```
# Start method

1. After Clone this repository to the local, compile and deploy
```
cd greeter-zksync-solidity
```
```
npm init -y
npm i -D typescript ts-node ethers@^5.7.2 zksync-web3@^0.13.4 hardhat @matterlabs/hardhat-zksync-solc @matterlabs/hardhat-zksync-deploy dotenv
```
```
// The goerli network is used here: actually running 'hardhat run --network goerli ./deploy/deploy.ts'
npx hardhat compile
```

2. Replacing the PRIVATE_KEY with the private key of the Ethereum wallet you're using for development
```
create .env file
Add this to the file and add your key
PRIVATE_KEY = "...PRIVATE_KEY..."
```

3. Run the script using the following command to run the deployment script
```
npx hardhat deploy-zksync
```
