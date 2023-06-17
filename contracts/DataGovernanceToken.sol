// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract DataGovernanceToken is ERC20Votes {
    uint256 public s_maxSupply = 7000000000000000000000000;

    constructor() 
        ERC20("AmarumGovernanceToken", "AGT") 
        ERC20Permit("AmarumGovernanceToken")
    {
        _mint(msg.sender, s_maxSupply);
    }

    function _afterTokenTransfer(
    address from,
    address to,
    uint256 amount
  ) internal override(ERC20Votes) {
    super._afterTokenTransfer(from, to, amount);
  }

  function _mint(address to, uint256 amount) internal override(ERC20Votes) {
    super._mint(to, amount);
  }

  function _burn(address account, uint256 amount) internal override(ERC20Votes) {
    super._burn(account, amount);
  }
}