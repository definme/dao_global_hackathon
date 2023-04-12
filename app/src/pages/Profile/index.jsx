import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import ProfileCard from '../../components/ProfileCard'

function Profile() {
  return (
    <Container sx={{ mb: '40px' }}>
      <Box>
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
