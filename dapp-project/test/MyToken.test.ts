import { expect } from "chai";
import { ethers } from "hardhat";

describe("MyToken", function () {
  it("Should deploy with the correct initial supply", async function () {
    const [owner] = await ethers.getSigners();
    const MyToken = await ethers.getContractFactory("MyToken");
    const myToken = await MyToken.deploy("MyToken", "MTK", 1000000);

    expect(await myToken.totalSupply()).to.equal(1000000);
    expect(await myToken.balanceOf(owner.address)).to.equal(1000000);
  });
});