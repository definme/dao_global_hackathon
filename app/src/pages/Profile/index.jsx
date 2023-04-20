import { useContext } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import ProfileCard from '../../components/ProfileCard'
import { ConnectionContext } from '../../contexts/ConnectionContext'

function Profile() {
  const { governanceUserBalance } = useContext(ConnectionContext)

  return (
    <Container sx={{ mb: '40px' }}>
      <Box>
        <Typography
          variant='h4'
          component='h1'
          gutterBottom
          sx={{ m: '40px auto 20px', textAlign: 'center', fontWeight: 700 }}
        >
          DAO Governance Token Balance
        </Typography>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              background: 'rgba(0, 0, 0, 0.8)',
              p: '40px',
              borderRadius: '20px',
            }}
          >
            <Typography
              color='white'
              sx={{ fontSize: '20px', fontWeight: 600 }}
            >
              {Number(governanceUserBalance).toFixed(2)} EtherLuxeToken(ELT)
            </Typography>
          </Box>
        </Box>
        <Typography
          variant='h4'
          component='h1'
          gutterBottom
          sx={{ m: '40px auto 60px', textAlign: 'center', fontWeight: 700 }}
        >
          My NFTs
        </Typography>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            justifyContent: 'center',
          }}
        >
          <ProfileCard
            title='Transport'
            description='Some Description'
            price='20'
            image={require('../../images/bike.png')}
          />
          <ProfileCard
            title='Transport'
            description='Some Description'
            price='20'
            image={require('../../images/bike.png')}
          />
          <ProfileCard
            title='Transport'
            description='Some Description'
            price='20'
            image={require('../../images/bike.png')}
          />
        </Box>
      </Box>
    </Container>
  )
}

export default Profile
