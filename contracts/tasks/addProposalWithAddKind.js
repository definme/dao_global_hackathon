const { task } = require('hardhat/config')
const {
  TokenVotingClient,
  Context,
  ContextPlugin,
} = require('@aragon/sdk-client')

const pk = process.env.PK
const IPFS_API_KEY = process.env.IPFS_API_KEY

async function getTokenVotingClient(signer) {
  const contextParams = {
    network: 'maticmum',
    signer,
    daoFactoryAddress: '0x5bDBaAfd90B908058567080513635f560F896918',
    web3Providers: ['https://endpoints.omniatech.io/v1/matic/mumbai/public/'],
    ipfsNodes: [
      {
        url: 'https://testing-ipfs-0.aragon.network/api/v0',
        headers: { 'X-API-KEY': IPFS_API_KEY || '' },
      },
    ],
    graphqlNodes: [
      {
        url: 'https://subgraph.satsuma-prod.com/qHR2wGfc5RLi6/aragon/osx-mumbai/api',
      },
    ],
  }

  const context = new Context(contextParams)

  const contextPlugin = ContextPlugin.fromContext(context)
  return new TokenVotingClient(contextPlugin)
}

task('add-proposal-with-add-kind', 'Add proposal with add kind').setAction(
  async (taskArgs, hre) => {
    const provider = new hre.ethers.providers.JsonRpcProvider(
      'https://endpoints.omniatech.io/v1/matic/mumbai/public/'
    )
    const signer = new hre.ethers.Wallet(pk, provider)

    const tokenVotingClient = await getTokenVotingClient(signer)
    const metadata = {
      title: 'Title',
      summary: 'Summary',
      description: 'Description',
    }

    const metadataUri = await tokenVotingClient.methods.pinMetadata(metadata)

    const saleArtifact = await hre.deployments.get('SaleContract')
    const saleContractInstance = await hre.ethers.getContractAt(
      saleArtifact.abi,
      saleArtifact.address
    )

    const iface = saleContractInstance.interface
  }
)
