import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

function ProfileCard({
  collection,
  image_uri,
  name,
  level,
  contract_token_id,
  kind,
}) {
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
        src={image_uri}
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
          {collection.name}
        </Typography>
        <Typography gutterBottom color='white'>
          Name: {name}
        </Typography>
        <Typography gutterBottom color='white'>
          Level: {level}
        </Typography>
        <Typography gutterBottom color='white'>
          Kind: {kind}
        </Typography>
        <Typography gutterBottom color='white'>
          ID: {contract_token_id}
        </Typography>
      </Box>
    </Box>
  )
}

export default ProfileCard
