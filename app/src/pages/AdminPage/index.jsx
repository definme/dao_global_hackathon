import { useContext, useState } from 'react'
import AddProposalModal from '../../components/AddProposalModal'
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
  const isAdmin = userAddress === ADMIN_ADDRESS

  const handleOpenModal = () => setProposalModalOpen(true)
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
            onClick={handleOpenModal}
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
            onClick={handleOpenModal}
            disabled={MIN_GOVERNANCE_TOKEN_TO_PROPOSAL > governanceUserBalance}
          >
            Proposal with changing Governance token Invariant
          </Button>
        </DAOInfo>
      )}

      <AddProposalModal isOpen={proposalModalOpen} onClose={handleCloseModal} />
    </DAOContainer>
  )
}

export default AdminPage
