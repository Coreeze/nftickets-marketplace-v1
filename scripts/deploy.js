async function main() {
  const NfticketsMarketplace = await ethers.getContractFactory(
    "nfticketsMarketplace"
  );

  // Start deployment, returning a promise that resolves to a contract object
  const nfticketsMarketplace = await NfticketsMarketplace.deploy();
  await nfticketsMarketplace.deployed();
  console.log("Contract deployed to address:", nfticketsMarketplace.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
