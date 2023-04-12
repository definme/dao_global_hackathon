import Box from '@mui/material/Box'
import BuyCard from '../../components/BuyCard'

function Characters() {
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
        title='Character'
        description='Some Description'
        price='100'
        image={require('../../images/char.png')}
      />
      <BuyCard
        title='Character'
        description='Some Description'
        price='100'
        image={require('../../images/char.png')}
      />
      <BuyCard
        title='Character'
        description='Some Description'
        price='100'
        image={require('../../images/char.png')}
      />
    </Box>
  )
}

export default Characters
