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
  ProposalStatus,
  ExecuteProposalStep,
} from '@aragon/sdk-client'
import { hexToBytes } from '@aragon/sdk-common'
import { Contract } from '@ethersproject/contracts'
import networks from '../networks.json'
import { APP_NETWORK, IPFS_API_KEY } from '../constants'
import CollectionAbi from '../abi/Collection.json'

const useDAO = userAddress => {
  const daoAddressOrEns = '0xf47cf722840a814f826cbe22d1ca6130974fcdc8'
  const pluginAddress = '0x6bcc8dd13bc076d8b3fe8d075db8ca78acb576a0'

  const [client, setClient] = useState()
  const [dao, setDao] = useState()
  const [proposals, setProposals] = useState([])
  const [pendingProposals, setPendingProposals] = useState([])
  const [successProposals, setSuccessProposals] = useState([])
  const [tokenVotingClient, setTokenVotingClient] = useState()

  const queryParams = {
    daoAddressOrEns,
    skip: 0,
    direction: SortDirection.DESC,
    sortBy: ProposalSortBy.CREATED_AT,
    status: ProposalStatus.ACTIVE,
  }
  const queryParamsPending = {
    daoAddressOrEns,
    skip: 0,
    direction: SortDirection.DESC,
    sortBy: ProposalSortBy.CREATED_AT,
    status: ProposalStatus.PENDING,
  }
  const queryParamsSuccess = {
    daoAddressOrEns,
    skip: 0,
    direction: SortDirection.DESC,
    sortBy: ProposalSortBy.CREATED_AT,
    status: ProposalStatus.SUCCEEDED,
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

  async function createProposalWithAction(
    title,
    description,
    setTxHash,
    setSuccess
  ) {
    const metadata = {
      title,
      summary: description,
      description,
    }

    const metadataUri = await tokenVotingClient.methods.pinMetadata(metadata)

    const iface = new Contract(
      networks[APP_NETWORK].contracts.charactersCollection,
      CollectionAbi
    ).interface
    const data = iface.encodeFunctionData('addKind', ['1', 'newKind'])
    const configAction = {
      to: networks[APP_NETWORK].contracts.charactersCollection,
      value: ethers.BigNumber.from(0),
      data: hexToBytes(data),
    }

    // const configAction = { to: userAddress, value: ethers.utils.parseEther('0.01'), data: new Uint8Array() }

    const proposalParams = {
      pluginAddress,
      metadataUri,
      actions: [configAction],
      startDate: new Date(Date.now() + 300000), // 5 minutes
      endDate: new Date(Date.now() + 3900000), // min 1 hour
      // endDate: new Date(Date.now() + 86400000), // 24 hours
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

  async function executeProposal(proposalId, setTxHash, setTxSuccess) {
    const steps = tokenVotingClient.methods.executeProposal(proposalId)

    for await (const step of steps) {
      try {
        // eslint-disable-next-line default-case
        switch (step.key) {
          case ExecuteProposalStep.EXECUTING:
            setTxHash(step.txHash)
            break
          case ExecuteProposalStep.DONE:
            setTxSuccess('SUCCESS!!')
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
    setProposals(proposals)
    const pendingProposals = await tokenVotingClient.methods.getProposals(
      queryParamsPending
    )
    setPendingProposals(pendingProposals)
    const successProposals = await tokenVotingClient.methods.getProposals(
      queryParamsSuccess
    )
    setSuccessProposals(successProposals)
  }

  async function getProposal(proposalId) {
    const proposal = await tokenVotingClient.methods.getProposal(proposalId)
    return proposal
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
    pendingProposals,
    successProposals,
    createProposal,
    voteProposal,
    userCanVote,
    getProposal,
    createProposalWithAction,
    executeProposal,
  }
}

export default useDAO
