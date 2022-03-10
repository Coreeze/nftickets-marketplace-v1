async function main() {
  const MarketPlaceBoilerPlate = await ethers.getContractFactory(
    "marketPlaceBoilerPlate"
  );

  // Start deployment, returning a promise that resolves to a contract object
  const marketPlaceBoilerPlate = await MarketPlaceBoilerPlate.deploy();
  await marketPlaceBoilerPlate.deployed();
  console.log("Contract deployed to address:", marketPlaceBoilerPlate.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
