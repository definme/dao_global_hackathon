# EtherLuxe DApp

### DApp is currently configured to work with only one network. All configs for network should be in /src/network.json as follows:

```
{
  "80001": {
    "name": "Mumbai",
    "image": "https://mumbai.polygonscan.com/images/svg/brands/poly.png?v=1.3",
    "params": {
      "chainId": "0x13881",
      "chainName": "Mumbai",
      "nativeCurrency": {
        "name": "MATIC",
        "symbol": "MATIC",
        "decimals": 18
      },
      "rpcUrls": ["https://endpoints.omniatech.io/v1/matic/mumbai/public/"],
      "blockExplorerUrls": ["https://mumbai.polygonscan.com/"]
    },
    "contracts": {
      "collectionSale": "0x83280fF66f592Fa76346f1bF19081C6592Db6F12",
      "charactersCollection": "0x1B0aEdC47657Ca0488Db7a112221BE99957209fF",
      "transportCollection": "0xe850d9f15DD8469eebbDc0E42955222326640A53",
      "weaponCollection": "0xBa8Ab694cc247D65aAe6557784B0CCbf104DBAA2",
      "governanceToken": "0x434a8abd38BE1d84Dd7aE8fF00F501773Bfd236f"
    }
  }
}

```

### Project must contain following environment variables

```txt
REACT_APP_IPFS_API_KEY='ipfs_private_key'
```

## Development server

Run `yarn` for install packages

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Production server

In production project starting in docker container
`docker-compose` file from which the project image is run is in [main repository](https://github.com/definme/dao_global_hackathon)
