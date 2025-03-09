export function convertWalletData(response) {
  return response.reduce((acc, network) => {
    acc[network.network_name] = {
      address: network.address,
      network_id: network.network_id,
      network_symbol: network.network_symbol,
    };
    return acc;
  }, {});
}

export const shortenAddress = (address, length = 4) => {
  if (!address || address?.length < length * 2 + 2) {
    return "";
  }

  const start = address.slice(0, length);
  const end = address.slice(-length);

  return `${start}...${end}`;
};

export const filterNftTokens = (data, address) => {
  const firstOccurrenceMap = new Map();

  data.forEach((item) => {
    const tokenId = Number(item.tokenID);

    if (
      item.to.toLowerCase() === address.toLowerCase() &&
      !firstOccurrenceMap.has(tokenId)
    ) {
      firstOccurrenceMap.set(tokenId, tokenId);
    }
  });

  return Array.from(firstOccurrenceMap.values());
};

export const extractIpfsHash = (url) => {
  const parts = url.split("/ipfs/");
  return parts.length > 1 ? parts[1] : null;
};
// *******************************************************************

export const findObjectByCid = (arr, targetUri) => {
  return arr.find((obj) => obj.uri === targetUri);
};

export const findIndexOf = (arr, targetURI) => {
  return arr.findIndex((item) => item.itemURI === targetURI);
};

export const getContractByAddress = (data, address) => {
  return data
    .filter((item) => item.contract.toLowerCase() === address.toLowerCase())
    .map((obj) => {
      return {
        ...obj,
        uri: replaceUri(obj.metadata_url),
      };
    });
};

export const replaceUri = (metadata) => {
  if (!metadata) {
    return null;
  }

  if (Array.isArray(metadata)) {
    return metadata.map((obj) => {
      if (obj.uri && obj.uri.includes("/")) {
        const lastSegment = obj.uri.split("/").pop();
        return {
          ...obj,
          uri: lastSegment,
        };
      } else {
        return obj;
      }
    });
  } else if (typeof metadata === "string") {
    if (metadata.includes("/")) {
      return metadata.split("/").pop();
    } else {
      return metadata;
    }
  }
  return metadata;
};
