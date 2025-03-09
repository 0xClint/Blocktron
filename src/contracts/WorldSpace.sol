// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

error SpaceAlreadyExists(uint256 spaceId);
error InvalidSpaceId(uint256 spaceId);
error InvalidAddress(address player);
error InvalidSize(uint256 size);
error SizeAlreadyExists(uint256 size);
error InvalidURI(string uri);

contract WorldSpaces is ERC721URIStorage, Ownable {
    struct Space {
        uint256 spaceId;
        string name; // Name of the space
        uint256 size; // Size in Unit^2
        string uri; // Dynamic URI
    }

    mapping(uint256 => Space) public spaces; 
    mapping(address => uint256[]) private userSpaces; 

    uint256 private _nextSpaceId;
    uint256[] public allowedSizes; 

    constructor(uint256[] memory sizes) ERC721("WorldSpaces", "SPACE") Ownable(msg.sender) {
        require(sizes.length > 0, "Sizes must be provided");
        allowedSizes = sizes; // Array for allowed sizes
    }

    function createSpace(string memory name, uint256 size, string memory uri) public returns (uint256) {
        if (bytes(name).length == 0) revert InvalidAddress(msg.sender);
        if (bytes(uri).length == 0) revert InvalidURI(uri);

        // Check if the size is valid
        bool validSize = false;
        for (uint256 i = 0; i < allowedSizes.length; i++) {
            if (allowedSizes[i] == size) {
                validSize = true;
                break;
            }
        }
        if (!validSize) revert InvalidSize(size);

        uint256 spaceId = _nextSpaceId;
        _nextSpaceId++; 

        if (spaces[spaceId].spaceId != 0) revert SpaceAlreadyExists(spaceId);

        spaces[spaceId] = Space(spaceId, name, size, uri);
        _mint(msg.sender, spaceId);
        _setTokenURI(spaceId, uri);
        userSpaces[msg.sender].push(spaceId); 

        return spaceId;
    }
 

    function setSpaceURI(uint256 spaceId, string memory uri) public {
        if (ownerOf(spaceId) != msg.sender) revert InvalidAddress(msg.sender);
        if (bytes(uri).length == 0) revert InvalidURI(uri);

        spaces[spaceId].uri = uri; 
        _setTokenURI(spaceId, uri); 
    }

    // Owner-only function to add new sizes
    function addAllowedSize(uint256 size) public onlyOwner {
        for (uint256 i = 0; i < allowedSizes.length; i++) {
            if (allowedSizes[i] == size) revert SizeAlreadyExists(size);
        }
        allowedSizes.push(size); 
    }

    // Getter functions 
    // To get Total Spaces for User just use balanceOf

    function getUserSpaces(address user) public view returns (uint256[] memory) {
        return userSpaces[user];
    }

    function getSpaceDetails(uint256 spaceId) public view returns (Space memory) {
        if (spaceId >= _nextSpaceId || spaces[spaceId].spaceId < 0) revert InvalidSpaceId(spaceId); 
        return spaces[spaceId];
    }

    function getAllSpacesDetails(address user) public view returns (Space[] memory) {
        uint256[] memory userSpaceIds = userSpaces[user];
        Space[] memory userSpacesDetails = new Space[](userSpaceIds.length);
        
        for (uint256 i = 0; i < userSpaceIds.length; i++) {
            userSpacesDetails[i] = spaces[userSpaceIds[i]];
        }
        
        return userSpacesDetails;
    }

}