const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  // Get the private key from the environment variables
  const privateKey = process.env.PRIVATE_KEY;

  // The URL of the Ethereum network provider
  const networkUrl = "https://eth-goerli.g.alchemy.com/v2/h-asDNMJ21mVniDAY3XE1VQ9F7PW7A0x";

  // Create a provider using the network URL
  const provider = new ethers.providers.JsonRpcProvider(networkUrl);

  // Create a signer using the private key and provider
  const signer = new ethers.Wallet(privateKey, provider);

  // The address of the already deployed contract
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  // Get the contract factory and attach it to the signer
  const IndianNFT = await ethers.getContractFactory("mahesh", signer);
  const contract = await IndianNFT.attach(contractAddress);

  // Call the contract's mint function to mint 5 tokens
  await contract.mint(5);

  // Log a message to indicate that the tokens have been minted
  console.log("Minted 5 tokens");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
