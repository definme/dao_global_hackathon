import Box from '@mui/material/Box'
import BuyCard from '../../components/BuyCard'

function Transport() {
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
        title='Transport'
        description='Some Description'
        price='20'
        image={require('../../images/bike.png')}
      />
      <BuyCard
        title='Transport'
        description='Some Description'
        price='20'
        image={require('../../images/bike.png')}
      />
      <BuyCard
        title='Transport'
        description='Some Description'
        price='20'
        image={require('../../images/bike.png')}
      />
    </Box>
  )
}

export default Transport
