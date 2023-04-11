import { useContext } from 'react'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import networks from '../../networks.json'
import { ConnectionContext } from '../../contexts/ConnectionContext'
import { APP_NETWORK } from '../../constants'

export default function ChainIndicator({ chain }) {
  const { switchNetwork } = useContext(ConnectionContext)

  if (chain === APP_NETWORK) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <Avatar src={networks[chain].image} alt='chain'></Avatar>
        <Typography variant='h6' component='h3'>
          {networks[chain].name}
        </Typography>
      </Box>
    )
  }
  return (
    <Button onClick={switchNetwork}>
      <Typography variant='h6' component='h3' color='red'>
        Wrong network
      </Typography>
    </Button>
  )
}
