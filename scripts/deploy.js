const hre = require("hardhat");
const fs = require('fs');

async function main() {
  const FileNFT = await hre.ethers.getContractFactory("VideoDataSet");
  const fileShare = await FileNFT.deploy();
  await fileShare.deployed();
  console.log("Amarum Contract deployed to:", fileShare.address);

  fs.writeFileSync('./config.js', `
  export const AmarumAddress = "${fileShare.address}"
  `)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
