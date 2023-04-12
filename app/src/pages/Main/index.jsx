import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import BuyCard from '../../components/BuyCard'

function Main() {
  return (
    <Container sx={{ mb: '40px' }}>
      <Box>
        <Typography
          variant='h4'
          component='h1'
          gutterBottom
          sx={{ m: '40px auto 60px', textAlign: 'center', fontWeight: 700 }}
        >
          EtherLuxe NFT Marketplace
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
          <BuyCard
            title='Character'
            description='Some Description'
            price='100'
            image={require('../../images/char.png')}
          />
          <BuyCard
            title='Transport'
            description='Some Description'
            price='20'
            image={require('../../images/bike.png')}
          />
          <BuyCard
            title='Weapon'
            description='Some Description'
            price='20'
            image={require('../../images/weapon.png')}
          />
        </Box>
      </Box>
    </Container>
  )
}

export default Main
