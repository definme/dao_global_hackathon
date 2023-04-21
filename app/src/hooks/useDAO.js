import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import {
  Context,
  Client,
  ContextPlugin,
  TokenVotingClient,
  SortDirection,
  ProposalSortBy,
  ProposalCreationSteps,
  VoteValues,
  VoteProposalStep,
} from '@aragon/sdk-client'
import networks from '../networks.json'
import { APP_NETWORK, IPFS_API_KEY } from '../constants'

const useDAO = userAddress => {
  const daoAddressOrEns = '0xf47cf722840a814f826cbe22d1ca6130974fcdc8'
  const pluginAddress = '0x6bcc8dd13bc076d8b3fe8d075db8ca78acb576a0'

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

  async function createProposal(title, description, setTxHash, setSuccess) {
    const metadata = {
      title,
      summary: description,
      description,
    }

    const metadataUri = await tokenVotingClient.methods.pinMetadata(metadata)

    const proposalParams = {
      pluginAddress,
      metadataUri,
      actions: [],
      startDate: new Date(Date.now() + 300000), // 5 minutes
      endDate: new Date(Date.now() + 86400000), // 24 hours
    }

    const steps = tokenVotingClient.methods.createProposal(proposalParams)
    for await (const step of steps) {
      try {
        // eslint-disable-next-line default-case
        switch (step.key) {
          case ProposalCreationSteps.CREATING:
            setTxHash(step.txHash)
            break
          case ProposalCreationSteps.DONE:
            console.log(step.proposalId)
            setSuccess('SUCCESS!!')
            break
        }
      } catch (err) {
        console.error(err)
      }
    }
    getProposals()
  }

  async function voteProposal(proposalId, voteValue, setTxHash, setSuccess) {
    let vote
    switch (voteValue) {
      case 'yes':
        vote = VoteValues.YES
        break
      case 'no':
        vote = VoteValues.NO
        break
      case 'abstain':
        vote = VoteValues.ABSTAIN
        break
      default:
        break
    }
    const voteParams = {
      proposalId,
      vote,
    }

    const steps = tokenVotingClient.methods.voteProposal(voteParams)

    for await (const step of steps) {
      try {
        // eslint-disable-next-line default-case
        switch (step.key) {
          case VoteProposalStep.VOTING:
            setTxHash(step.txHash)
            break
          case VoteProposalStep.DONE:
            setSuccess('SUCCESS!!')
            break
        }
      } catch (err) {
        console.error(err)
      }
    }
    getProposals()
  }

  async function getDao() {
    const dao = await client.methods.getDao(daoAddressOrEns)
    setDao({ dao })
  }

  async function getProposals() {
    const proposals = await tokenVotingClient.methods.getProposals(queryParams)
    setProposals({ proposals })
  }

  async function userCanVote(proposalId) {
    const canVoteParams = {
      proposalId,
      voterAddressOrEns: userAddress,
      vote: VoteValues.YES,
    }
    const canVote = await tokenVotingClient.methods.canVote(canVoteParams)
    return { canVote }
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
    createProposal,
    voteProposal,
    userCanVote,
  }
}

export default useDAO
