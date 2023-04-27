# EtherLuxe DAO

Game-focused marketplace and decentralized autonomous organization that allows users to manage in-game content.

Designed for [DAO Global Hakathon](https://daoglobalhackathon.hackerearth.com/)

Live on 🤖 🦾 🌃 🌐 🚀 https://ether-luxe.definme.com/ 🤖 🦾 🌃 🌐 🚀

## About

The concept of the project is allow users to participate in adding new game elements. At the initial stage, the user can buy an NFT character on the marketplace and receive tokens along with the NFT governance tokens which give the right to participate in voting.

### A plot describing balanced distribution of governance token for every NFT purchase
![governance-for-purchase](https://user-images.githubusercontent.com/25884190/234820533-61cf124b-ed38-42b5-a1f1-6bcff69ac88c.png)

### Basic project configuration:

- 3 collection contracts (Characters, Vehicles, Weapons)
- every collection has several kinds, there is a basic one (kind 0)
- sale contract with one governance collection (Characters) and one non-governance collection (Weapons; Vehicles will be added on-vote)
- oracle contract storing data of every NFT purchase
- Aragon DAO for voting

Votings are created by the platform administrator and the following options are available in the presented MVP:

- Adding new NFT kinds to existing collections
- Adding new collections to the sale contract
- Changing the `governanceTokensInvariant` attribute which affects the number of government tokens received on NFT purchase in a collection that is added as CollectionGovernance
- Mint additional governance tokens

## Technical design

### Smart contracts

The key part of the project are the Solidity smart contracts used to implement the GameFi parts, which are represented by collection contracts, the sale contract and the [Aragon OSx](https://devs.aragon.org/docs/osx/) DAO functionality.

### Backend

Built using the Django web framework, which is a popular Python-based tool for building web applications. We use RESTful APIs, the Django Rest Framework (DRF) to simplify the process of building APIs and make them more modular and scalable.

### Frontend

DApp has been built with ReactJS, a widely-used JavaScript library for building user interfaces. This enables the application to provide a more responsive, dynamic and interactive user experience.

## How to run

### Contracts deploy

Deploy Aragon DAO

Clone repo and go to the `contracts` directory
export envs for deploy contracts:

``` bash
export MNEMONIC=<mnemonic phrase>
export ETHERSCAN_API_KEY=<polygonscan api key>
export MUMBAI_URL=https://rpc-mumbai.maticvigil.com
export GOVERNANCE_TOKEN_ADDRESS=<aragon governance token address>
```

``` bash
yarn
# deploy oracle
yarn hardhat deploy --network mumbai --tags SaleContractOracle
# deploy sale contract
yarn hardhat deploy --network mumbai --tags SaleContract
# deploy collections(characters, transports, weapons)
yarn hardhat deploy --network mumbai --tags EtherLuxeCollectionCharacters,EtherLuxeCollectionTransports,EtherLuxeCollectionWeapons
# add base collections kind
yarn hardhat deploy --network mumbai --tags AddBaseKind
# add collections to the sale contract
yarn hardhat deploy --network mumbai --tags AddCollections
# verify contracts 
yarn hardhat etherscan-verify --network mumbai --api-key $ETHERSCAN_API_KEY
```

### Run project in docker

export envs

```bash
export SECRET_KEY=<django secret key>
export DB_HOST=api_db
export DB_PASSWORD=<db password>
export DB_USER=<db user>
export DB_NAME=<db name>
export INDEXER_INTERVAL=30
export SALE_CONTRACT=<sale contract address>
export ORACLE_CONTRACT=<oracle contract address>
export ORACLE_WORKER_PRIVATE_KEY=<private key of wallet with oracle worker role>
export PURCHASE_ADMIN_PRIVATE_KEY=<private key of wallet with purchase admin role>
export REACT_APP_IPFS_API_KEY=<ipfs api key>
```

deploy on host:

```bash
DOCKER_HOST=ssh://root@<host ip> docker-compose up -d --build
```
