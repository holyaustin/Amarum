// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

contract DAONFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter public _tokenIds;

    uint256 MembershipPrice = 0.005 ether;
    address payable owner;

    mapping(uint256 => MarketItem) private idToMarketItem;

    struct MarketItem {
      uint256 tokenId;
      address payable seller;
      address payable owner;
      uint256 price;
      bool sold;
    }

    event MarketItemCreated (
      uint256 indexed tokenId,
      address seller,
      address owner,
      uint256 price,
      bool sold
    );

    constructor() ERC721("Aamrum Membership NFT", "AMNFT") {
      owner = payable(msg.sender);
    }

    /* Updates the Membership price of the contract */
    function updateMembershipPrice(uint _MembershipPrice) public payable {
      require(owner == msg.sender, "Only marketplace owner can update Membership price.");
      MembershipPrice = _MembershipPrice;
    }

    /* Returns the Membership price of the contract */
    function getMembershipPrice() public view returns (uint256) {
      return MembershipPrice;
    }

    /* Mints a Membership token  */
    function createToken() public payable returns (uint) {
      _tokenIds.increment();
      uint256 newTokenId = _tokenIds.current();
       uint256 price = MembershipPrice;
        string memory tokenURI = "https://bafkreihqvhqlk4j5ea4hky3fmk24cj6xhw2rhgbkfcbg6fktlkprbec7gm.ipfs.nftstorage.link/";
        require(msg.value >= MembershipPrice, "Price must be equal to membership price");
        idToMarketItem[newTokenId] =  MarketItem(
        newTokenId,
        payable(msg.sender),
        payable(address(this)),
        price,
        false
      );
      
        bool sent = payable(address(this)).send(price);
        require(sent, "Failed to send Ether");
      _mint(msg.sender, newTokenId);
      _setTokenURI(newTokenId, tokenURI);
      emit MarketItemCreated(
        newTokenId,
        msg.sender,
        address(this),
        price,
        false
      );
      // payable(address(this)).transfer(price);
      return newTokenId;
    }

    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

        function withdraw(uint value) external {
        require(msg.sender == owner, "Address is not the owner");
        require(value <= address(this).balance, "Value higher than balance.");

        (bool success, ) = owner.call{value: value}("");
        require(success, "There was an error!");
    }

}

