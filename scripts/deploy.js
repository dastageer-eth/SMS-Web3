const { ethers } = require("hardhat");

const main = async() => {
  const [deployer] = await ethers.getSigners();

  const SMSContract = await ethers.getContractFactory("SMSContract");
  const smsContract = await SMSContract.deploy();

  console.log("smsContract address:", smsContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });