import { useContext, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Box from '@mui/material/Box'
import { ConnectionContext } from '../../contexts/ConnectionContext'
import { shortenAddress } from '../../utils'
import {
  MainHeader,
  HeaderContainer,
  MenuLink,
  MenuContainer,
  LogoLink,
  LogoFirstName,
  LogoSecondName,
  BalanceFirstName,
  BalanceSecondName,
  AddressContainer,
  ConnectButton,
} from './Header.styled'
import { APP_NETWORK } from '../../constants'

function Header() {
  const { userAddress, chainId, connectWallet, balance, switchNetwork } =
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
      <MainHeader>
        <HeaderContainer>
          <LogoLink to='/'>
            <img
              src={require('../../images/Logo.png')}
              alt='logo'
              width='32px'
              height='48px'
            />
            <p>
              <LogoFirstName>Ether</LogoFirstName>
              <LogoSecondName>Luxe</LogoSecondName>
            </p>
          </LogoLink>
          <MenuContainer>
            <MenuLink current={currentLocation.home.toString()} to='/'>
              Home
            </MenuLink>
            <MenuLink
              current={currentLocation.marketplace.toString()}
              to='/marketplace/characters'
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
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '25px',
            }}
          >
            {userAddress ? (
              chainId === APP_NETWORK ? (
                <>
                  <p>
                    <BalanceFirstName>
                      {Number(balance.toFixed(2))}
                    </BalanceFirstName>
                    <BalanceSecondName> MATIC</BalanceSecondName>
                  </p>
                  <AddressContainer>
                    {shortenAddress(userAddress)}
                  </AddressContainer>
                </>
              ) : (
                <ConnectButton onClick={switchNetwork}>
                  Wrong network
                </ConnectButton>
              )
            ) : (
              <ConnectButton onClick={connectWallet}>
                Connect Wallet
              </ConnectButton>
            )}
          </Box>
        </HeaderContainer>
      </MainHeader>
    </Box>
  )
}

export default Header
