import { ethers } from "hardhat";

const main = async () => {
  const transactoinFactory = await ethers.getContractFactory('Uniswap')
  const transactionContract = await transactoinFactory.deploy()

  await transactionContract.deployed()

  console.log('Transactions deployed to:', transactionContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
