import { useContext, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Box from '@mui/material/Box'
import { ConnectionContext } from '../../contexts/ConnectionContext'
import { shortenAddress } from '../../utils'
import { Button } from '../Button'
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
  MenuBurger,
  LogoName,
  HeaderDrawer,
  CloseDrawer,
} from './Header.styled'
import { APP_NETWORK, ADMIN_ADDRESS } from '../../constants'
import { useMediaQuery } from '@mui/material'

function Header() {
  const { userAddress, chainId, connectWallet, balance, switchNetwork } =
    useContext(ConnectionContext)
  const location = useLocation()
  const isMobile = useMediaQuery('(max-width:741px)')
  const [openDraw, setOpenDraw] = useState(false)
  const isAdmin = userAddress === ADMIN_ADDRESS

  const handleDrawer = () => {
    setOpenDraw(!openDraw)
  }

  const [currentLocation, setCurrentLocation] = useState({
    home: false,
    marketplace: false,
    profile: false,
    dao: false,
    admin: false,
  })

  useEffect(() => {
    if (location.pathname.includes('/marketplace')) {
      setCurrentLocation({
        home: false,
        marketplace: true,
        profile: false,
        dao: false,
        admin: false,
      })
    } else if (location.pathname.includes('/profile')) {
      setCurrentLocation({
        home: false,
        marketplace: false,
        profile: true,
        dao: false,
        admin: false,
      })
    } else if (location.pathname.includes('/dao')) {
      setCurrentLocation({
        home: false,
        marketplace: false,
        profile: false,
        dao: true,
        admin: false,
      })
    } else if (location.pathname.includes('/admin')) {
      setCurrentLocation({
        home: false,
        marketplace: false,
        profile: false,
        dao: false,
        admin: true,
      })
    } else {
      setCurrentLocation({
        home: true,
        marketplace: false,
        profile: false,
        dao: false,
        admin: false,
      })
    }
    if (openDraw) {
      handleDrawer()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  return (
    <Box>
      <MainHeader>
        <HeaderContainer>
          {isMobile ? (
            <>
              <MenuBurger onClick={handleDrawer} />
              <HeaderDrawer open={openDraw} onClose={handleDrawer}>
                <>
                  <Header.Menu
                    currentLocation={currentLocation}
                    isAdmin={isAdmin}
                  />
                  <CloseDrawer onClick={handleDrawer} />
                </>
              </HeaderDrawer>
            </>
          ) : (
            <Header.Menu currentLocation={currentLocation} isAdmin={isAdmin} />
          )}

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
                <Button onClick={switchNetwork}>Wrong network</Button>
              )
            ) : (
              <Button onClick={connectWallet}>Connect Wallet</Button>
            )}
          </Box>
        </HeaderContainer>
      </MainHeader>
    </Box>
  )
}

Header.Menu = ({ currentLocation, isAdmin }) => {
  return (
    <>
      <LogoLink to='/'>
        <img
          src={require('../../images/Logo.png')}
          alt='logo'
          width='32px'
          height='48px'
        />
        <LogoName>
          <LogoFirstName>Ether</LogoFirstName>
          <LogoSecondName>Luxe</LogoSecondName>
        </LogoName>
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
        <MenuLink current={currentLocation.profile.toString()} to='/profile'>
          Profile
        </MenuLink>
        <MenuLink current={currentLocation.dao.toString()} to='/dao'>
          DAO
        </MenuLink>
        {isAdmin && (
          <MenuLink current={currentLocation.admin.toString()} to='/admin'>
            Admin
          </MenuLink>
        )}
      </MenuContainer>
    </>
  )
}

export default Header
