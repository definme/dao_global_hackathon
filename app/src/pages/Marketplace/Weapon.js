import Box from '@mui/material/Box'
import BuyCard from '../../components/BuyCard'

function Weapon() {
  return (
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
        title='Weapon'
        description='Some Description'
        price='20'
        image={require('../../images/weapon.png')}
      />
      <BuyCard
        title='Weapon'
        description='Some Description'
        price='20'
        image={require('../../images/weapon.png')}
      />
      <BuyCard
        title='Weapon'
        description='Some Description'
        price='20'
        image={require('../../images/weapon.png')}
      />
    </Box>
  )
}

export default Weapon
