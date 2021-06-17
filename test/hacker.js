const Fallout = artifacts.require("Fallout");
const Hacker = artifacts.require("Hacker");
const { BN } = require("@openzeppelin/test-helpers");
const { expect } = require("chai");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Hacker", function ([owner, hacker]) {
  it("should take ownership of fallout contract", async function () {
    const targetInstance = await Fallout.new({ from: owner });
    const hackerInstance = await Hacker.new({ from: hacker });
    const result = await hackerInstance.attack(targetInstance.address, { from: hacker });
    expect(result.receipt.status).to.be.equal(true);
    const targetOwner = await targetInstance.owner();
    expect(targetOwner).to.be.equal(hackerInstance.address);
  });
});
