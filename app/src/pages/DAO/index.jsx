import { useContext, useState } from 'react'
import { ethers } from 'ethers'
import Proposal from '../../components/Proposal'
import AddProposalModal from '../../components/AddProposalModal'
import { ConnectionContext } from '../../contexts/ConnectionContext'
import networks from '../../networks.json'
import { APP_NETWORK, MIN_GOVERNANCE_TOKEN_TO_PROPOSAL } from '../../constants'
import { shortenAddress } from '../../utils'
import { Button } from '../../components/Button'
import {
  DAOLink,
  DAOAddressLink,
  DAOImg,
  DAOATokenLink,
  DAOContainer,
  DAOInfo,
  DAOInfoContainer,
  DAOInfoLinkContainer,
  DAOInfoNameContainer,
  DAOInfoTextContainer,
  DAOInfoNameTitle,
  DAOShareButton,
  DAODescription,
  DAOPromoContainer,
  DAOPromoText,
  DAOBalanceImageContainer,
  DAOSubtitle,
  DAOImageContainer,
  Tooltip,
  TooltipWrapper,
} from './DAO.styled'

function DAO() {
  const {
    dao,
    proposals,
    governanceContractBalance,
    governanceUserBalance,
    pendingProposals,
    successProposals,
    userAddress,
  } = useContext(ConnectionContext)
  const [proposalModalOpen, setProposalModalOpen] = useState(false)

  function getIPFSLink(ipfs) {
    if (!ipfs) return
    return 'https://ipfs.eth.aragon.network/ipfs/' + ipfs.split('//')[1]
  }

  const handleOpenModal = () => setProposalModalOpen(true)
  const handleCloseModal = () => setProposalModalOpen(false)

  return (
    <DAOContainer>
      {dao && (
        <DAOInfo>
          <DAOInfoContainer>
            <DAOInfoNameContainer>
              <DAOImageContainer>
                {' '}
                <DAOImg
                  src={getIPFSLink(dao.dao?.metadata?.avatar)}
                  alt='avatar'
                />
              </DAOImageContainer>

              <DAOInfoTextContainer>
                <DAOInfoNameTitle>{dao.dao?.metadata?.name}</DAOInfoNameTitle>{' '}
                <DAOLink
                  href={dao.dao?.metadata?.links[0]?.url}
                  target='_blank'
                >
                  {dao.dao?.metadata?.links[0]?.url}
                </DAOLink>
              </DAOInfoTextContainer>
            </DAOInfoNameContainer>
            <DAOInfoLinkContainer>
              <DAOShareButton
                href={
                  networks[APP_NETWORK].params.blockExplorerUrls[0] +
                  'address/' +
                  dao.dao?.address
                }
                target='_blank'
              >
                <img
                  src={require('../../images/share.png')}
                  width='20px'
                  height='20px'
                  alt='share'
                />
              </DAOShareButton>
              <DAOAddressLink>
                {shortenAddress(dao.dao?.address)}
              </DAOAddressLink>
            </DAOInfoLinkContainer>
          </DAOInfoContainer>
          <DAODescription> {dao.dao?.metadata?.description}</DAODescription>
          <DAOPromoContainer>
            <DAOPromoText>
              <DAOBalanceImageContainer>
                <img
                  src={require('../../images/Logo.png')}
                  alt='matic'
                  width='21px'
                  height='32px'
                />
              </DAOBalanceImageContainer>
              <span>
                {Number(governanceContractBalance).toFixed(0)} FREE DAO
                Governance tokens!{' '}
                <DAOATokenLink
                  href={`${networks[APP_NETWORK].params.blockExplorerUrls[0]}address/${networks[APP_NETWORK].contracts.governanceToken}`}
                  target='_blank'
                >
                  (ELT)
                </DAOATokenLink>
              </span>
            </DAOPromoText>
            <TooltipWrapper>
              <Tooltip
                opened={
                  MIN_GOVERNANCE_TOKEN_TO_PROPOSAL > governanceUserBalance
                    ? true
                    : false
                }
              >
                You must have at least{' '}
                {Number(
                  ethers.utils
                    .formatEther(MIN_GOVERNANCE_TOKEN_TO_PROPOSAL)
                    .toString()
                )}{' '}
                ELT
              </Tooltip>
              <Button
                onClick={handleOpenModal}
                disabled={
                  MIN_GOVERNANCE_TOKEN_TO_PROPOSAL > governanceUserBalance
                }
              >
                Create new proposal
              </Button>
            </TooltipWrapper>
          </DAOPromoContainer>
        </DAOInfo>
      )}
      <DAOSubtitle>
        {!userAddress ? 'Please connect to metamask' : 'DAO Governance'}
      </DAOSubtitle>
      {pendingProposals &&
        pendingProposals.map((proposal, key) => (
          <Proposal key={key + proposal.id} proposal={proposal} />
        ))}
      {successProposals &&
        successProposals.map((proposal, key) => (
          <Proposal key={key + proposal.id} proposal={proposal} success />
        ))}
      {proposals &&
        proposals.map((proposal, key) => (
          <Proposal key={key + proposal.id} proposal={proposal} />
        ))}
      <AddProposalModal isOpen={proposalModalOpen} onClose={handleCloseModal} />
    </DAOContainer>
  )
}

export default DAO
