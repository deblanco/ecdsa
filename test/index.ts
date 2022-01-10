import { expect } from "chai";
import { ethers } from "hardhat";

describe("ECDSATest", function () {
  let ecdsa: any;
  beforeEach(async () => {
    const ECDSA = await ethers.getContractFactory("ECDSATest");
    ecdsa = await ECDSA.deploy();
    await ecdsa.deployed();
  });

  it("Should sign a message with the owner address and recover the address from the signature", async function () {
    const [owner] = await ethers.getSigners();
    const [ownerAddress] = await Promise.all([owner.getAddress()]);

    const msg = "Test1";
    const encodedMsg = ethers.utils.solidityKeccak256(["string"], [msg]);
    const signature = await owner.signMessage(
      ethers.utils.arrayify(encodedMsg)
    );
    const prefixedMsg = await ecdsa.prefixed(encodedMsg);
    expect(await ecdsa.recoverSigner(prefixedMsg, signature)).to.equal(
      ownerAddress
    );
  });
});
