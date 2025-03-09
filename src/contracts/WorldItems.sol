// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

error LevelNotFound(uint256 level);
error ItemAlreadyAwarded(address player, uint256 levelId);
error InvalidAddress(address player);
error InvalidURI(string uri);

contract GameItems is ERC721URIStorage, Ownable {
    struct Level {
        string itemURI; // URI of level item
        bool exists; // By default false
    }

    mapping(uint256 => Level) public levels; 
    mapping(address => uint256[]) public playerItems; 
    mapping(address => mapping(uint256 => bool)) public playerLevelAwarded; // Tracks Already Awarded Items

    uint256 private _nextTokenId;
    uint256 private _nextLevelId;

    constructor() ERC721("GameItem", "ITM") Ownable(msg.sender) {}

    function addLevel(string memory itemURI) public onlyOwner {
        if (bytes(itemURI).length == 0) revert InvalidURI(itemURI);
        
        levels[_nextLevelId++] = Level(itemURI, true);
    }

    function awardItem(address player, uint256 levelId) public returns (uint256 tokenId) {
        if (player == address(0)) revert InvalidAddress(player);
        
        Level storage level = levels[levelId];
        if (!level.exists) revert LevelNotFound(levelId);
        if (playerLevelAwarded[player][levelId]) revert ItemAlreadyAwarded(player, levelId);

        tokenId = _nextTokenId++;
        _mint(player, tokenId);
        _setTokenURI(tokenId, level.itemURI);
        playerItems[player].push(tokenId);
        playerLevelAwarded[player][levelId] = true; 
    }

    function getPlayerItems(address player) public view returns (uint256[] memory) {
        return playerItems[player];
    }

    function getPlayerItemsWithDetails(address player) public view returns (uint256[] memory tokenIds, string[] memory itemURIs) {
        uint256[] memory items = playerItems[player];
        tokenIds = items;
        itemURIs = new string[](items.length);
        
        for (uint256 i = 0; i < items.length; i++) {
            itemURIs[i] = tokenURI(items[i]);
        }
    }
   
    function getAllLevels() public view returns (Level[] memory) {
        Level[] memory allLevels = new Level[](_nextLevelId);
        for (uint256 i = 0; i < _nextLevelId; i++) {
            allLevels[i] = levels[i];
        }
        return allLevels;
    }
}