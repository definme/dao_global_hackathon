import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

function BuyCard({ title, description, price, image }) {
  return (
    <Box
      sx={{
        borderRadius: '20px',
        width: '268px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: ' 0 0 12px 1px #000000',
        p: '15px',
        background: 'rgba(0, 0, 0, 0.6)',
      }}
    >
      <img
        src={image}
        width='100%'
        height='300px'
        style={{ objectFit: 'contain' }}
        alt='nft'
      />
      <Box
        sx={{
          p: '15px 0',
        }}
      >
        <Typography
          align='center'
          textTransform='uppercase'
          gutterBottom
          color='white'
        >
          {title}
        </Typography>
        <Typography gutterBottom color='white'>
          {description}
        </Typography>
        <Typography gutterBottom color='white'>
          Price: {price}
        </Typography>
        <Button
          variant='contained'
          sx={{
            fontWeight: 'bold',
            width: '100%',
            background: 'lightseagreen',
          }}
        >
          BUY
        </Button>
      </Box>
    </Box>
  )
}

export default BuyCard
