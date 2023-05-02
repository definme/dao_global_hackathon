import { useContext, useState } from 'react'
import AddProposalWithsActionModal from '../../components/AddProposalWithActionModal'
import { ConnectionContext } from '../../contexts/ConnectionContext'
import {
  MIN_GOVERNANCE_TOKEN_TO_PROPOSAL,
  ADMIN_ADDRESS,
} from '../../constants'
import { Button } from '../../components/Button'
import { DAOContainer, DAOInfo, DAOSubtitle } from './AdminPage.styled'

function AdminPage() {
  const { dao, governanceUserBalance, userAddress } =
    useContext(ConnectionContext)
  const [proposalModalOpen, setProposalModalOpen] = useState(false)
  const [proposalType, setProposalType] = useState('')
  const isAdmin = userAddress === ADMIN_ADDRESS

  const handleOpenModal = type => {
    setProposalModalOpen(true)
    setProposalType(type)
  }
  const handleCloseModal = () => setProposalModalOpen(false)

  return (
    <DAOContainer>
      <DAOSubtitle>
        {!userAddress
          ? 'Please connect to metamask'
          : !isAdmin
          ? 'Only admin can add voting with actions'
          : 'Add proposal with actions'}
      </DAOSubtitle>
      {isAdmin && dao && (
        <DAOInfo>
          <Button
            onClick={handleOpenModal}
            disabled={MIN_GOVERNANCE_TOKEN_TO_PROPOSAL > governanceUserBalance}
          >
            Proposal with addition new NFT collection to the game
          </Button>
          <Button
            onClick={() => handleOpenModal('kind')}
            disabled={MIN_GOVERNANCE_TOKEN_TO_PROPOSAL > governanceUserBalance}
          >
            Proposal with addition new kind to existing NFT
          </Button>
          <Button
            onClick={handleOpenModal}
            disabled={MIN_GOVERNANCE_TOKEN_TO_PROPOSAL > governanceUserBalance}
          >
            Proposal with minting new Governance tokens to SaleContract
          </Button>
          <Button
            onClick={() => handleOpenModal('invariant')}
            disabled={MIN_GOVERNANCE_TOKEN_TO_PROPOSAL > governanceUserBalance}
          >
            Proposal with changing Governance token Invariant
          </Button>
        </DAOInfo>
      )}

      <AddProposalWithsActionModal
        isOpen={proposalModalOpen}
        onClose={handleCloseModal}
        type={proposalType}
      />
    </DAOContainer>
  )
}

export default AdminPage
