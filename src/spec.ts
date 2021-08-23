import { IdentifierSpec } from "./types";

const namespace = "[-a-z0-9]{3,8}";
const reference = "[-a-zA-Z0-9]{1,32}";
const assetReference = "[-a-zA-Z0-9]{1,64}";
const address = "[a-zA-Z0-9]{1,64}";
const tokenId = "[-a-zA-Z0-9]{1,32}";

const CAIP2: IdentifierSpec = {
  name: "chainId",
  regex: `(${namespace}):(${reference})`,
  parameters: ["namespace", "reference"],
  delimiter: ":",
};

const CAIP10: IdentifierSpec = {
  name: "accountId",
  regex: `(${namespace}):(${reference}):(${address})`,
  parameters: ["namespace", "reference", "address"],
  delimiter: ":",
};

// represents namespace:reference in CAIP-19
const AssetName: IdentifierSpec = {
  name: "assetName",
  regex: `(${namespace}):(${assetReference})`,
  parameters: ["namespace", "reference"],
  delimiter: ":",
};

const CAIP19AssetType: IdentifierSpec = {
  name: "assetType",
  regex: `${CAIP2.regex}/${AssetName.regex}`,
  parameters: [CAIP2, AssetName],
  delimiter: "/",
};

const CAIP19AssetId: IdentifierSpec = {
  name: "assetId",
  regex: `${CAIP2.regex}/${AssetName.regex}/(${tokenId})`,
  parameters: [CAIP2, AssetName, "tokenId"],
  delimiter: "/",
};

export const CAIP = {
  "2": CAIP2,
  "10": CAIP10,
  "19": {
    assetName: AssetName,
    assetType: CAIP19AssetType,
    assetId: CAIP19AssetId,
  },
};
