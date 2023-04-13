import { useContext, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import ChainIndicator from '../ChainIndicator'
import { ConnectionContext } from '../../contexts/ConnectionContext'
import { shortenAddress } from '../../utils'
import { MenuLink, MenuContainer, LogoLink } from './Header.styled'

function Header() {
  const { userAddress, chainId, connectWallet, balance } =
    useContext(ConnectionContext)
  const location = useLocation()

  const [currentLocation, setCurrentLocation] = useState({
    home: false,
    marketplace: false,
    profile: false,
    dao: false,
  })

  useEffect(() => {
    if (location.pathname.includes('/marketplace')) {
      setCurrentLocation({
        home: false,
        marketplace: true,
        profile: false,
        dao: false,
      })
    } else if (location.pathname.includes('/profile')) {
      setCurrentLocation({
        home: false,
        marketplace: false,
        profile: true,
        dao: false,
      })
    } else if (location.pathname.includes('/dao')) {
      setCurrentLocation({
        home: false,
        marketplace: false,
        profile: false,
        dao: true,
      })
    } else {
      setCurrentLocation({
        home: true,
        marketplace: false,
        profile: false,
        dao: false,
      })
    }
  }, [location])

  return (
    <Box>
      <AppBar position='static' sx={{ background: 'rgba(0, 0, 0, 0.8)' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <LogoLink to='/'>EtherLuxe</LogoLink>
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
            <MenuLink
              current={currentLocation.profile.toString()}
              to='/profile'
            >
              Profile
            </MenuLink>
            <MenuLink current={currentLocation.dao.toString()} to='/dao'>
              DAO
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
              {Number(balance.toFixed(2))} MATIC
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
