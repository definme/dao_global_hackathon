import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import {
  Context,
  Client,
  ContextPlugin,
  TokenVotingClient,
  SortDirection,
  ProposalSortBy,
} from '@aragon/sdk-client'
import networks from '../networks.json'
import { APP_NETWORK, IPFS_API_KEY } from '../constants'

const useDAO = userAddress => {
  const daoAddressOrEns = '0xf47cf722840a814f826cbe22d1ca6130974fcdc8'
  const [client, setClient] = useState()
  const [dao, setDao] = useState()
  const [proposals, setProposals] = useState()
  const [tokenVotingClient, setTokenVotingClient] = useState()

  const queryParams = {
    daoAddressOrEns,
    skip: 0, // optional
    // limit: 10, // optional
    direction: SortDirection.DESC, // optional, otherwise DESC ("descending")
    sortBy: ProposalSortBy.CREATED_AT, // optional, otherwise NAME, VOTES (POPULARITY coming soon)
    // status: ProposalStatus.ACTIVE, // optional, otherwise PENDING, SUCCEEDED, EXECUTED, DEFEATED
  }

  async function getDao() {
    const dao = await client.methods.getDao(daoAddressOrEns)
    setDao({ dao })
  }

  async function getProposals() {
    const proposals = await tokenVotingClient.methods.getProposals(queryParams)
    setProposals({ proposals })
  }

  useEffect(() => {
    if (!userAddress) return
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contextParams = {
      network: 'maticmum',
      signer: provider.getSigner(),
      daoFactoryAddress: '0x5bDBaAfd90B908058567080513635f560F896918',
      web3Providers: networks[APP_NETWORK].params.rpcUrls,
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
    setClient(new Client(context))
    const contextPlugin = ContextPlugin.fromContext(context)
    setTokenVotingClient(new TokenVotingClient(contextPlugin))
  }, [userAddress])

  useEffect(() => {
    if (client) getDao()
  }, [client])

  useEffect(() => {
    if (tokenVotingClient) getProposals()
  }, [tokenVotingClient])

  return {
    dao,
    proposals,
  }
}

export default useDAO
