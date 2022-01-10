// SPDX-License-Identifier: BSD-3-Clause

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

pragma solidity ^0.8.0;

contract ECDSATest {
  function recoverSigner(bytes32 message, bytes memory sig)
    public
    pure
    returns (address)
  {
    return ECDSA.recover(message, sig);
  }

  function prefixed(bytes32 hash) public pure returns (bytes32) {
    return ECDSA.toEthSignedMessageHash(hash);
  }
}
