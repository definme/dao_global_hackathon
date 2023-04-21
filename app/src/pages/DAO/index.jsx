import { useContext, useState } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Proposal from '../../components/Proposal'
import AddProposalModal from '../../components/AddProposalModal'
import { ConnectionContext } from '../../contexts/ConnectionContext'
import networks from '../../networks.json'
import { APP_NETWORK } from '../../constants'
import { DAOLink, DAOAddressLink, DAOImg, DAOATokenLink } from './DAO.styled'

function DAO() {
  const {
    dao,
    proposals,
    governanceContractBalance,
    pendingProposals,
    successProposals,
  } = useContext(ConnectionContext)
  const [proposalModalOpen, setProposalModalOpen] = useState(false)

  function getIPFSLink(ipfs) {
    if (!ipfs) return
    return 'https://ipfs.eth.aragon.network/ipfs/' + ipfs.split('//')[1]
  }

  const handleOpenModal = () => setProposalModalOpen(true)
  const handleCloseModal = () => setProposalModalOpen(false)

  return (
    <Container sx={{ mb: '40px' }}>
      {dao && (
        <Box
          sx={{
            width: '100%',
            boxSizing: 'border-box',
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            flexDirection: 'column',
            background: 'rgba(0, 0, 0, 0.8);',
            borderRadius: '20px',
            m: '40px auto 60px',
            p: '40px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography
              variant='h4'
              component='h1'
              gutterBottom
              sx={{
                textAlign: 'center',
                fontWeight: 700,
                color: 'lightseagreen',
              }}
            >
              {dao.dao?.metadata?.name}
            </Typography>
            <DAOAddressLink
              href={
                networks[APP_NETWORK].params.blockExplorerUrls[0] +
                'address/' +
                dao.dao?.address
              }
              target='_blank'
            >
              {dao.dao?.address}
            </DAOAddressLink>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '20px',
            }}
          >
            <Box
              sx={{
                maxWidth: '800px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Typography
                variant='p'
                component='p'
                gutterBottom
                sx={{
                  color: 'white',
                }}
              >
                {dao.dao?.metadata?.description}
              </Typography>
              <Typography
                variant='p'
                component='p'
                gutterBottom
                sx={{
                  color: 'white',
                }}
              >
                {Number(governanceContractBalance).toFixed(0)} free DAO
                Governance tokens!{' '}
                <DAOATokenLink
                  href={`${networks[APP_NETWORK].params.blockExplorerUrls[0]}address/${networks[APP_NETWORK].contracts.governanceToken}`}
                  target='_blank'
                >
                  (ELT)
                </DAOATokenLink>
              </Typography>
              <DAOLink href={dao.dao?.metadata?.links[0]?.url} target='_blank'>
                {dao.dao?.metadata?.links[0]?.url}
              </DAOLink>
              <Button
                onClick={handleOpenModal}
                variant='contained'
                sx={{
                  fontWeight: 'bold',
                  background: 'lightseagreen',
                  mt: '40px',
                  maxWidth: '250px',
                }}
              >
                Create new proposal
              </Button>
            </Box>
            <DAOImg src={getIPFSLink(dao.dao?.metadata?.avatar)} alt='avatar' />
          </Box>
        </Box>
      )}
      {pendingProposals &&
        pendingProposals.map((proposal, key) => (
          <Proposal key={key} proposal={proposal} />
        ))}
      {successProposals &&
        successProposals.map((proposal, key) => (
          <Proposal key={key} proposal={proposal} success />
        ))}
      {proposals &&
        proposals.map((proposal, key) => (
          <Proposal key={key} proposal={proposal} />
        ))}
      <AddProposalModal isOpen={proposalModalOpen} onClose={handleCloseModal} />
    </Container>
  )
}

export default DAO
