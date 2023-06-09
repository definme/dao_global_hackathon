import { useState, useContext, useEffect } from 'react'
import { utils } from 'ethers'
import VoteModal from '../VoteModal'
import { ConnectionContext } from '../../contexts/ConnectionContext'
import { APP_NETWORK } from '../../constants'
import networks from '../../networks.json'
import { shortenAddress, percentage } from '../../utils'
import {
  ProposalContainer,
  ProposalInfoContainer,
  ProposalTitle,
  ProposalSummary,
  ProposalBadge,
  ProposalDescription,
  ProposalAddresses,
  ProposalAddress,
  ProposalAddressSpan,
  ProposalResults,
  ProposalResult,
  ProposalResultSpan,
  ProposalVotingContainer,
  ProposalVotingInfo,
  ProposalResultPercent,
  TxLink,
  ProposalButton,
  ProposalTokenIneligible,
} from './Proposal.styled'

function Proposal({ proposal, success }) {
  const {
    userCanVote,
    userAddress,
    getProposal,
    executeProposal,
    chainId,
    governanceUserBalance,
  } = useContext(ConnectionContext)
  const [voteModalOpen, setVoteModalOpen] = useState(false)
  const [canVote, setCanVote] = useState(false)
  const [votes, setVotes] = useState()
  const [hasAction, setHasAction] = useState(false)
  const [voted, setVoted] = useState(true)
  const [ineligible, setIneligible] = useState(false)
  const [description, setDescription] = useState('')
  const [txHash, setTxHash] = useState()
  const [txSuccess, setTxSuccess] = useState()

  const handleOpenModal = () => setVoteModalOpen(true)
  const handleCloseModal = () => setVoteModalOpen(false)

  function getMaxVotes() {
    const maxValue = Math.max(
      Number(utils.formatEther(proposal.result.yes)),
      Number(utils.formatEther(proposal.result.no)),
      Number(utils.formatEther(proposal.result.abstain))
    )
    if (maxValue === 0) return -1
    return maxValue
  }

  const getVoted = () => {
    if (!userAddress || !votes) {
      setVoted(false)
      return
    }
    setVoted(
      votes.some(
        voter =>
          voter.address.toLowerCase() === userAddress.toLowerCase() &&
          voter.vote !== undefined
      )
    )
  }

  const isIneligebleToken = () => {
    if (
      proposal &&
      proposal.status === 'Active' && // active proposal
      userAddress && // logged in
      chainId === APP_NETWORK && // on proper network
      !voted && // haven't voted
      !canVote // cannot vote
    ) {
      setIneligible(true)
    } else setIneligible(false)
  }

  useEffect(() => {
    getVoted()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAddress, votes])

  useEffect(() => {
    isIneligebleToken()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAddress, canVote, chainId, proposal, voted])

  useEffect(() => {
    if (userAddress) {
      userCanVote(proposal.id).then(res => setCanVote(res.canVote))
      getProposal(proposal.id).then(res => {
        setDescription(res.metadata?.description)
        setHasAction(res.actions[0])
        setVotes(res.votes)
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAddress, proposal])

  return (
    <>
      <ProposalContainer>
        <ProposalInfoContainer>
          <div>
            <ProposalTitle>{proposal.metadata.title}</ProposalTitle>
            <ProposalSummary>{proposal.metadata.summary}</ProposalSummary>
            <ProposalSummary>{description}</ProposalSummary>
          </div>
          <ProposalBadge status={proposal.status}>
            {proposal.status}
          </ProposalBadge>
        </ProposalInfoContainer>
        <ProposalDescription>
          <ProposalResults>
            <ProposalResult
              isMax={
                Number(utils.formatEther(proposal.result.yes)) === getMaxVotes()
              }
            >
              Yes:{' '}
              <ProposalResultSpan>
                {Number(utils.formatEther(proposal.result.yes))}{' '}
                {proposal.token.symbol}
              </ProposalResultSpan>
              <ProposalResultPercent>
                {' '}
                (
                {percentage(
                  Number(utils.formatEther(proposal.result.yes)),
                  Number(utils.formatEther(proposal.totalVotingWeight))
                )}
                %)
              </ProposalResultPercent>
            </ProposalResult>
            <ProposalResult
              isMax={
                Number(utils.formatEther(proposal.result.no)) === getMaxVotes()
              }
            >
              No:{' '}
              <ProposalResultSpan>
                {Number(utils.formatEther(proposal.result.no))}{' '}
                {proposal.token.symbol}
              </ProposalResultSpan>
              <ProposalResultPercent>
                {' '}
                (
                {percentage(
                  Number(utils.formatEther(proposal.result.no)),
                  Number(utils.formatEther(proposal.totalVotingWeight))
                )}
                %)
              </ProposalResultPercent>
            </ProposalResult>
            <ProposalResult
              isMax={
                Number(utils.formatEther(proposal.result.abstain)) ===
                getMaxVotes()
              }
            >
              Abstain:{' '}
              <ProposalResultSpan>
                {Number(utils.formatEther(proposal.result.abstain))}{' '}
                {proposal.token.symbol}
              </ProposalResultSpan>
              <ProposalResultPercent>
                {' '}
                (
                {percentage(
                  Number(utils.formatEther(proposal.result.abstain)),
                  Number(utils.formatEther(proposal.totalVotingWeight))
                )}
                %)
              </ProposalResultPercent>
            </ProposalResult>
          </ProposalResults>
          <ProposalAddresses>
            <ProposalAddress>
              Proposal ID:{'   '}
              <ProposalAddressSpan>
                {shortenAddress(proposal.id)}
              </ProposalAddressSpan>
            </ProposalAddress>
            <ProposalAddress>
              Creator:{' '}
              <ProposalAddressSpan>
                {shortenAddress(proposal.creatorAddress)}
              </ProposalAddressSpan>
            </ProposalAddress>
          </ProposalAddresses>
        </ProposalDescription>
        <ProposalVotingContainer>
          <ProposalVotingInfo>
            Out of the total number of tokens:{' '}
            <ProposalResultSpan>
              {Number(utils.formatEther(proposal.totalVotingWeight))}{' '}
              {proposal.token.symbol}
            </ProposalResultSpan>
          </ProposalVotingInfo>
          {txHash ? (
            <ProposalButton>
              <TxLink
                href={`${networks[APP_NETWORK].params.blockExplorerUrls}tx/${txHash}`}
                target='_blank'
                rel='noreferrer'
              >
                {txSuccess ? txSuccess : txHash && shortenAddress(txHash)}
              </TxLink>
            </ProposalButton>
          ) : success && !hasAction ? (
            ''
          ) : success ? (
            <ProposalButton
              disabled={!hasAction || !(governanceUserBalance > 0)}
              onClick={() =>
                executeProposal(proposal.id, setTxHash, setTxSuccess)
              }
            >
              EXECUTE
            </ProposalButton>
          ) : (
            <ProposalButton disabled={!canVote} onClick={handleOpenModal}>
              VOTE
            </ProposalButton>
          )}
        </ProposalVotingContainer>
        {ineligible && governanceUserBalance > 0 && (
          <ProposalTokenIneligible>
            You had to hold EtherLuxe Token when proposal was created to be able
            to vote
          </ProposalTokenIneligible>
        )}
      </ProposalContainer>
      <VoteModal
        isOpen={voteModalOpen}
        onClose={handleCloseModal}
        proposalId={proposal.id}
      />
    </>
  )
}

export default Proposal
