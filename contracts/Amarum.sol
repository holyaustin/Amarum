// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

//import "hardhat/console.sol";

contract AmarumNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _daoIds;
    Counters.Counter public _viewIds;
    Counters.Counter public _itemApproved;

    address payable owner;
    address public admin;
    uint public currentEpoch;
    uint public epochStage; 
    uint public totalVotes;

    mapping(address => Member) public daoMembers;
    mapping(string => Repo) public AmarumRepos;
    
    mapping(uint256 => AmarumItem) private idToAmarumItem;
    mapping(uint256 => ViewItem) private idToViewItem;

    struct Repo {
        string url;
        string dealId;
        string pieceCid;
        address spAddress;
        uint numberOfVotes;
        bool stored;
        bool accepted;
        uint yesVotes;
        uint noVotes;
        bool isValue;
    }

    struct Member {
        uint256 memberId;
        address payable addr;
        uint availableVotes;
        uint votingPower;
        bool isValue;
    }

    struct AmarumItem {
      uint256 tokenId;
      address payable author;
      address payable owner;
      uint256 dateCreated;
      bool approved;
    }

    struct ViewItem {
      uint256 vId;
      uint256 tokenId;
      address visitor;
    }

    event AmarumItemCreated (
      uint256 indexed tokenId,
      address author,
      address owner,
      uint256 dateCreated,
      bool approved
    );

    event ViewItemCreated (
      uint256 indexed vId,
      uint256 tokenId,
      address visitor
    );

       event ApprovalCreated(
        uint256 indexed tokenId,
        address admin,
        uint256 dateApproved
       );

    // Modifiers
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can create");
        _;
    }

    modifier isDaoMember() {
        if(daoMembers[msg.sender].isValue){
            _;
        }
    }
    constructor() ERC721("Amarum Video-Dataset", "VDS") {
      owner = payable(msg.sender);
      admin = msg.sender;
    }

     /* Publish new work / Amarum */
    function createToken(string memory tokenURI) public payable returns (uint) {
      _tokenIds.increment();
      uint256 newTokenId = _tokenIds.current();

      _mint(msg.sender, newTokenId);
      _setTokenURI(newTokenId, tokenURI);
      createAmarumItem(newTokenId);
      return newTokenId;
    }

// Create Approval  new Amarum
    function createAmarumItem(
      uint256 tokenId
    ) private {
   
      idToAmarumItem[tokenId] =  AmarumItem(
        tokenId,
        payable(msg.sender),
        payable(address(this)),
        block.timestamp,
        false
      );

       _transfer(msg.sender, address(this), tokenId);
      emit AmarumItemCreated(
        tokenId,
        msg.sender,
        address(this),
        block.timestamp,
        false
      );
    }

// Create Amarum Approval after DAO voting
    function createAmarumApproval(
      uint256 tokenId
    ) public onlyAdmin {
   
      idToAmarumItem[tokenId].approved =  true;
      _itemApproved.increment();

      // _transfer(msg.sender, address(this), tokenId);
      emit ApprovalCreated(
        tokenId,
        msg.sender,
        block.timestamp
      );
    }

    // create a view
    function createViewItem (
      uint256 tokenId
    ) public {
      _viewIds.increment();
      uint256 newViewId = _viewIds.current();
      idToViewItem[newViewId] =  ViewItem(
        newViewId,
        tokenId,
        msg.sender
      );
      emit ViewItemCreated(
         newViewId,
        tokenId,
        msg.sender
      );
    }

    /* Returns all work */
    function fetchAllAmarums() public view returns (AmarumItem[] memory) {
      uint itemCount = _tokenIds.current();
      uint unsoldItemCount = _tokenIds.current();
      uint currentIndex = 0;

      AmarumItem[] memory items = new AmarumItem[](unsoldItemCount);
      for (uint i = 0; i < itemCount; i++) {
        if (idToAmarumItem[i + 1].owner == address(this)) {
          uint currentId = i + 1;
          AmarumItem storage currentItem = idToAmarumItem[currentId];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return items;
    }

  // get total view
  function fetchTotalViews() public view returns (uint256) {
    uint256 totalViews = _viewIds.current();
    return totalViews;
  }

    /* Returns only Item Views   */
    function fetchItemViews(uint256 tokenId) public view returns (uint256) {
      uint totalItemCount = _viewIds.current();
      uint itemCount = 0;

      for (uint i = 0; i < totalItemCount; i++) {
        if (idToViewItem[i + 1].tokenId == tokenId) {
          itemCount += 1;
        }
      }
    
      return itemCount;      
    }

   /* Returns only one items by token id   */
    function fetchOneAmarum(uint256 _tokenId) public view returns (AmarumItem[] memory) {
      uint totalItemCount = _tokenIds.current();
      uint itemCount = 0;
      uint currentIndex = 0;

      for (uint i = 0; i < totalItemCount; i++) {
        if (idToAmarumItem[i + 1].tokenId == _tokenId) {
          itemCount += 1;
        }
      }

      AmarumItem[] memory items = new AmarumItem[](itemCount);
      for (uint i = 0; i < totalItemCount; i++) {
        if (idToAmarumItem[i + 1].tokenId == _tokenId) {
          uint currentId = i + 1;
          AmarumItem storage currentItem = idToAmarumItem[currentId];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return items;
    }

    /* Returns only items that a user has published   */
    function fetchMyAmarums() public view returns (AmarumItem[] memory) {
      uint totalItemCount = _tokenIds.current();
      uint itemCount = 0;
      uint currentIndex = 0;

      for (uint i = 0; i < totalItemCount; i++) {
        if (idToAmarumItem[i + 1].author == msg.sender) {
          itemCount += 1;
        }
      }

      AmarumItem[] memory items = new AmarumItem[](itemCount);
      for (uint i = 0; i < totalItemCount; i++) {
        if (idToAmarumItem[i + 1].author == msg.sender) {
          uint currentId = i + 1;
          AmarumItem storage currentItem = idToAmarumItem[currentId];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return items;
    }

    /* Returns only items a user has listed */
    function fetchAmarumsApproved() public view returns (AmarumItem[] memory) {
      uint totalItemCount = _tokenIds.current();
      uint itemCount = 0;
      uint currentIndex = 0;

      for (uint i = 0; i < totalItemCount; i++) {
        if (idToAmarumItem[i + 1].approved == true) {
          itemCount += 1;
        }
      }

      AmarumItem[] memory items = new AmarumItem[](itemCount);
      for (uint i = 0; i < totalItemCount; i++) {
        if (idToAmarumItem[i + 1].approved == true) {
          uint currentId = i + 1;
          AmarumItem storage currentItem = idToAmarumItem[currentId];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return items;
    }

    function withdraw(uint value) external {
        require(msg.sender == owner, "Address is not the owner");
        require(value <= address(this).balance, "Value higher than balance.");

        (bool success, ) = owner.call{value: value}("");
        require(success, "There was an error!");
    }

// DAO part
 // Admin functions
   function adminAdvanceEpoch() public onlyAdmin{
       currentEpoch+=1;
   }

   function adminAdvanceStage() public onlyAdmin{
       epochStage+=1;
   }

    // Stage 0
    function joinDao() public payable  {
      _daoIds.increment();
      uint256 newTokenId = _daoIds.current();
        //require(epochStage == 0,"Incorrect stage for joinDao, wait for next Epoch");
        Member memory newMember = Member(
        newTokenId,
         payable(msg.sender),
         1, 
         1,
         true
        );
        totalVotes+=msg.value;
        daoMembers[msg.sender] = newMember;
    }

    // Stage 1
    function voteForRepo(string memory url) public isDaoMember {
        require(epochStage == 1,"Incorrect stage for voteForRepo");
        if(AmarumRepos[url].isValue){
            AmarumRepos[url].numberOfVotes+= daoMembers[msg.sender].availableVotes;
            // for now, members cast all their votes in 1 repo
            daoMembers[msg.sender].availableVotes = 0;
            if(AmarumRepos[url].numberOfVotes > totalVotes/2){
                AmarumRepos[url].accepted = true;
            }
        } else {
            Repo memory newRepo = Repo(
                {
                    numberOfVotes: daoMembers[msg.sender].availableVotes, 
                    url: url, 
                    isValue: true,
                    dealId: "",
                    pieceCid: "",
                    spAddress:address(0),
                    stored: false,
                    accepted: false,
                    yesVotes:0,
                    noVotes:0
                }
            );
            AmarumRepos[url] = newRepo;
        }
    }

    // Stage 2
    function minerSubmission (string memory url, string memory dealId, string memory pieceCid) public {
        require(epochStage == 2,"Incorrect stage for minerSubmission");
        Repo memory targetRepo = AmarumRepos[url];
        if(targetRepo.isValue){
            targetRepo.dealId = dealId;
            targetRepo.pieceCid = pieceCid;
            targetRepo.stored = true;    
            targetRepo.spAddress = msg.sender;
        }
        AmarumRepos[url] = targetRepo;
    }

    
}