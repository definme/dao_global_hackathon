import { ethers } from 'ethers'
import { Context, ContextParams, LIVE_CONTRACTS } from '@aragon/sdk-client'

export const IPFS_API_KEY = ''

const provider = new ethers.providers.Web3Provider(window.ethereum)

// export const contextParams = {
//   network: 'mumbai',
//   signer: provider.getSigner(),
//   daoFactoryAddress: LIVE_CONTRACTS['maticmum'].daoFactory,
//   web3Providers: networks[APP_NETWORK].params.rpcUrls,
//   ipfsNodes: [
//     {
//       url: 'https://testing-ipfs-0.aragon.network/api/v0',
//       headers: { 'X-API-KEY': IPFS_API_KEY || '' },
//     },
//   ],
//   graphqlNodes: [
//     {
//       url: 'https://subgraph.satsuma-prod.com/aragon/core-mumbai/api',
//     },
//   ],
// }

export const contextParams = {
  network: 'goerli',
  signer: provider.getSigner(),
  daoFactoryAddress: '0x1234381072385710239847120734123847123',
  web3Providers: ['https://rpc.ankr.com/eth_goerli'],
  ipfsNodes: [
    {
      url: 'https://testing-ipfs-0.aragon.network/api/v0',
      headers: { 'X-API-KEY': IPFS_API_KEY || '' },
    },
  ],
  graphqlNodes: [
    {
      url: 'https://subgraph.satsuma-prod.com/aragon/core-goerli/api',
    },
  ],
}

export const context = new Context(contextParams)
