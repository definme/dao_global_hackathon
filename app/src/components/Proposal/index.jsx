import { useState, useContext, useEffect } from 'react'
import { utils } from 'ethers'
import VoteModal from '../VoteModal'
import { ConnectionContext } from '../../contexts/ConnectionContext'
import { APP_NETWORK } from '../../constants'
import networks from '../../networks.json'
import { shortenAddress, percentage } from '../../utils'
import { Button } from '../Button'
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
} from './Proposal.styled'

function Proposal({ proposal, success }) {
  const { userCanVote, userAddress, getProposal, executeProposal } =
    useContext(ConnectionContext)
  const [voteModalOpen, setVoteModalOpen] = useState(false)
  const [canVote, setCanVote] = useState(false)
  const [hasAction, setHasAction] = useState(false)
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

  useEffect(() => {
    if (userAddress) {
      userCanVote(proposal.id).then(res => setCanVote(res.canVote))
      if (success)
        getProposal(proposal.id).then(res => setHasAction(res.actions[0]))
    }
  }, [userAddress, proposal])

  return (
    <>
      <ProposalContainer>
        <ProposalInfoContainer>
          <div>
            <ProposalTitle>{proposal.metadata.title}</ProposalTitle>
            <ProposalSummary>{proposal.metadata.summary}</ProposalSummary>
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
            <Button>
              <TxLink
                href={`${networks[APP_NETWORK].params.blockExplorerUrls}tx/${txHash}`}
                target='_blank'
                rel='noreferrer'
              >
                {txSuccess ? txSuccess : txHash && shortenAddress(txHash)}
              </TxLink>
            </Button>
          ) : success && !hasAction ? (
            ''
          ) : success ? (
            <Button
              disabled={!hasAction}
              onClick={() =>
                executeProposal(proposal.id, setTxHash, setTxSuccess)
              }
            >
              Execute
            </Button>
          ) : (
            <Button disabled={!canVote} onClick={handleOpenModal}>
              VOTE
            </Button>
          )}
        </ProposalVotingContainer>
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
