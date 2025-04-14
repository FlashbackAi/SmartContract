const hre = require("hardhat");

async function main() {
  // Compile if not already
  await hre.run("compile");

  // Get the contract "factory" for StorePermissions
  // (This string must match the contract name in StorePermissions.sol)
  const StorePermissions = await hre.ethers.getContractFactory("StorePermissions");

  // Deploy the contract (returns an Ethers v6 Contract object)
  const storePermissions = await StorePermissions.deploy();

  // In Ethers v6, use waitForDeployment() instead of .deployed()
  await storePermissions.waitForDeployment();

  // Retrieve the address
  const deployedAddress = await storePermissions.getAddress();
  console.log("StorePermissions deployed to:", deployedAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
