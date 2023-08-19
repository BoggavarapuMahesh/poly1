# ERC721 Token Contract: mahesh
This is a sample README template for the mahesh ERC721 token contract. The contract is based on the ERC721A standard and implements additional functionality. It allows for the minting of unique non-fungible tokens (NFTs) with a maximum quantity limit.
# Contract Overview
The mahesh contract inherits from the ERC721A contract and introduces custom features:

Minting: The owner of the contract can mint new NFTs, with a maximum quantity of 5 tokens.
Base URL: The base URL for the NFT metadata is set to a specific IPFS gateway.
Prompt Description: A prompt description can be retrieved from the contract.
# Contract Details
# Constructor
The constructor sets the initial state of the contract and assigns the contract owner.

# Modifiers
onlyOwner: Ensures that certain functions can only be executed by the contract owner.
# Functions
mint(uint256 quantity): Allows the contract owner to mint a specified quantity of NFTs. The total supply cannot exceed the maximum limit.

promptDescription(): Retrieves the prompt description set for the contract.

_baseURI(): Overrides the baseURI function to provide the base URL for NFT metadata.
# Usage
Deploy the contract to the Ethereum network.
As the contract owner, you can mint new NFTs using the mint function.
Token metadata is hosted on IPFS, and the base URL can be accessed through _baseURI().
Retrieve the prompt description using the promptDescription function
