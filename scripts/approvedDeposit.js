const { ethers } = require("hardhat");
const { FXRootContractAbi } = require("../artifacts/FXRootContractAbi.js");
const ABI = require("../artifacts/contracts/mahesh.sol/mahesh.json"); // Import ABI for the "mahesh" contract
require("dotenv").config();

async function main() {
  try {
    // Set up the Ethereum network provider and private key
    const networkAddress = "https://eth-goerli.g.alchemy.com/v2/h-asDNMJ21mVniDAY3XE1VQ9F7PW7A0x";
    const privateKey = process.env.PRIVATE_KEY;
    const provider = new ethers.providers.JsonRpcProvider(networkAddress);

    // Create a wallet instance and retrieve the signer
    const wallet = new ethers.Wallet(privateKey, provider);
    const [signer] = await ethers.getSigners();

    // Get the contract factory for the "mahesh" NFT contract
    const NFT = await ethers.getContractFactory("mahesh");
    const nft = await NFT.attach("0x5FbDB2315678afecb367f032d93F642f64180aa3");

    // Configure the FXRoot contract
    const fxRootAddress = "0xF9bc4a80464E48369303196645e876c8C7D972de";
    const fxRoot = await ethers.getContractAt(FXRootContractAbi, fxRootAddress);

    // Token IDs to be transferred
    const tokenIds = [0, 1, 2, 3, 4];
    const gasLimit = 2000000; // Set an appropriate gas limit for the transaction

    // Approve the "mahesh" NFT contract for transfer
    const approveTx = await nft.connect(signer).setApprovalForAll(fxRootAddress, true);
    await approveTx.wait();
    console.log("Approval confirmed");

    // Iterate through token IDs and deposit to FXRoot contract
    for (let i = 0; i < tokenIds.length; i++) {
      const depositTx = await fxRoot
        .connect(signer)
        .deposit(nft.address, wallet.address, tokenIds[i], "0x6566", { gasLimit });
      await depositTx.wait();
    }

    console.log("Approved and deposited");

    // Check the updated balance of "mahesh" NFTs in the wallet
    const balance = await nft.balanceOf(wallet.address);
    console.log(
      "NFT wallet balance",
      wallet.address,
      "is:",
      balance.toString()
    );
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

main();
