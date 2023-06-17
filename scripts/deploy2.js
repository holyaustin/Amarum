const hre = require("hardhat");
const fs = require('fs');

async function main() {
  const DaoNFT = await hre.ethers.getContractFactory("DAONFT");
  const DAONFT = await DaoNFT.deploy();
  await DAONFT.deployed();
  console.log("DAO NFT Contract deployed to:", DAONFT.address);

  fs.writeFileSync('./config2.js', `
  export const MembershipNFTAddress = "${DAONFT.address}"
  `)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
