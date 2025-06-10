import { ethers } from "hardhat";

async function main() {
  const JournalHash = await ethers.getContractFactory("JournalHash");
  const journalHash = await JournalHash.deploy();
  await journalHash.waitForDeployment(); // <-- updated for ethers v6
  console.log(`JournalHash deployed to: ${journalHash.target}`); // use .target for address in ethers v6
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});