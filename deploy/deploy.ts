import { Wallet, utils } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import { config } from 'dotenv';

config()

const PRIVATE_KEY: string = process.env.PRIVATE_KEY;
if (!PRIVATE_KEY) {
    throw new Error("Please set ZKS_PRIVATE_KEY in the environment variables.");
}

export default async function (hre: HardhatRuntimeEnvironment) {
    console.log(`Running deploy script for the Greeter contract`);

    const wallet = new Wallet(PRIVATE_KEY);

    const deployer = new Deployer(hre, wallet);
    const artifact = await deployer.loadArtifact("Greeter");

    const greeting = "Hi there!";
    const deploymentFee = await deployer.estimateDeployFee(artifact, [greeting]);

    const depositHandle = await deployer.zkWallet.deposit({
        to: deployer.zkWallet.address,
        token: utils.ETH_ADDRESS,
        amount: deploymentFee.mul(2),
    });

    await depositHandle.wait();

    const parsedFee = ethers.utils.formatEther(deploymentFee.toString());
    console.log(`The deployment is estimated to cost ${parsedFee} ETH`);

    const greeterContract = await deployer.deploy(artifact, [greeting]);

    console.log("constructor args:" + greeterContract.interface.encodeDeploy([greeting]));
    
    const contractAddress = greeterContract.address;
    console.log(`${artifact.contractName} was deployed to ${contractAddress}`);
}

