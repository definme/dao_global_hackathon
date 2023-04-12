import { useContext, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ChainIndicator from '../ChainIndicator'
import { ConnectionContext } from '../../contexts/ConnectionContext'
import { shortenAddress } from '../../utils'
import { MenuLink, MenuContainer } from './Header.styled'

function Header() {
  const { userAddress, chainId, connectWallet } = useContext(ConnectionContext)
  const location = useLocation()

  const [currentLocation, setCurrentLocation] = useState({
    home: false,
    marketplace: false,
  })

  useEffect(() => {
    if (location.pathname.includes('/marketplace')) {
      setCurrentLocation({
        home: false,
        marketplace: true,
      })
    } else {
      setCurrentLocation({
        home: true,
        marketplace: false,
      })
    }
  }, [location])

  return (
    <Box>
      <AppBar position='static' sx={{ background: 'rgba(0, 0, 0, 0.8)' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant='h6' component='div'>
            EtherLuxe
          </Typography>
          <MenuContainer>
            <MenuLink current={currentLocation.home.toString()} to='/'>
              Home
            </MenuLink>
            <MenuLink
              current={currentLocation.marketplace.toString()}
              to='/marketplace'
            >
              Marketplace
            </MenuLink>
          </MenuContainer>
          {userAddress ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <ChainIndicator chain={chainId} />
              {shortenAddress(userAddress)}
            </Box>
          ) : (
            <Button color='inherit' onClick={connectWallet}>
              Connect Wallet
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
