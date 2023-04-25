import { useState, useContext, useEffect } from 'react'
import { utils } from 'ethers'
import VoteModal from '../VoteModal'
import { ConnectionContext } from '../../contexts/ConnectionContext'
import { APP_NETWORK } from '../../constants'
import networks from '../../networks.json'
import { shortenAddress } from '../../utils'
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
  ProposalButton,
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
          <ProposalResults>
            <ProposalResult>
              Yes:{' '}
              <ProposalResultSpan>
                {Number(utils.formatEther(proposal.result.yes))}{' '}
                {proposal.token.symbol}
              </ProposalResultSpan>
            </ProposalResult>
            <ProposalResult>
              No:{' '}
              <ProposalResultSpan>
                {Number(utils.formatEther(proposal.result.no))}{' '}
                {proposal.token.symbol}
              </ProposalResultSpan>
            </ProposalResult>
            <ProposalResult>
              Abstain:{' '}
              <ProposalResultSpan>
                {Number(utils.formatEther(proposal.result.abstain))}{' '}
                {proposal.token.symbol}
              </ProposalResultSpan>
            </ProposalResult>
          </ProposalResults>
        </ProposalDescription>
        <ProposalVotingContainer>
          <ProposalVotingInfo>
            Out of the total number of tokens:{' '}
            {Number(utils.formatEther(proposal.totalVotingWeight))}{' '}
            {proposal.token.symbol}
          </ProposalVotingInfo>
          {txHash ? (
            <ProposalButton>
              <a
                href={`${networks[APP_NETWORK].params.blockExplorerUrls}tx/${txHash}`}
                target='_blank'
                rel='noreferrer'
              >
                {txSuccess ? txSuccess : txHash && shortenAddress(txHash)}
              </a>
            </ProposalButton>
          ) : success ? (
            <ProposalButton
              disabled={!hasAction}
              onClick={() =>
                executeProposal(proposal.id, setTxHash, setTxSuccess)
              }
            >
              Execute
            </ProposalButton>
          ) : (
            <ProposalButton disabled={!canVote} onClick={handleOpenModal}>
              VOTE
            </ProposalButton>
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
