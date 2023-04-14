import { useContext } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { ConnectionContext } from '../../contexts/ConnectionContext'
import networks from '../../networks.json'
import { APP_NETWORK } from '../../constants'
import { DAOLink, DAOAddressLink } from './DAO.styled'

function DAO() {
  const { dao } = useContext(ConnectionContext)

  function getIPFSLink(ipfs) {
    if (!ipfs) return
    return 'https://ipfs.eth.aragon.network/ipfs/' + ipfs.split('//')[1]
  }

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
              alignItems: 'flex-start',
              gap: '20px',
            }}
          >
            <Box sx={{ maxWidth: '800px' }}>
              <Typography
                variant='p'
                component='p'
                gutterBottom
                sx={{
                  color: 'white',
                  mb: '40px',
                }}
              >
                {dao.dao?.metadata?.description}
              </Typography>
              <DAOLink href={dao.dao?.metadata?.links[0]?.url} target='_blank'>
                {dao.dao?.metadata?.links[0]?.url}
              </DAOLink>
            </Box>
            <img src={getIPFSLink(dao.dao?.metadata?.avatar)} alt='avatar' />
          </Box>
        </Box>
      )}
    </Container>
  )
}

export default DAO
