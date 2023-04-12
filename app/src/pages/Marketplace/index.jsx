import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Characters from './Characters'
import Weapon from './Weapon'
import Transport from './Transport'
import { MenuContainer, MenuLink, PageContainer } from './Marketplace.styled'

function Marketplace() {
  const location = useLocation()

  const [currentLocation, setCurrentLocation] = useState({
    characters: false,
    weapon: false,
    transport: false,
  })

  useEffect(() => {
    if (location.pathname.includes('/weapon')) {
      setCurrentLocation({
        characters: false,
        weapon: true,
        transport: false,
      })
    } else if (location.pathname.includes('/transport')) {
      setCurrentLocation({
        characters: false,
        weapon: false,
        transport: true,
      })
    } else {
      setCurrentLocation({
        characters: true,
        weapon: false,
        transport: false,
      })
    }
  }, [location])

  return (
    <PageContainer>
      <MenuContainer>
        <MenuLink
          current={currentLocation.characters.toString()}
          to='/marketplace/characters'
        >
          Characters
        </MenuLink>
        <MenuLink
          current={currentLocation.weapon.toString()}
          to='/marketplace/weapon'
        >
          Weapon
        </MenuLink>
        <MenuLink
          current={currentLocation.transport.toString()}
          to='/marketplace/transport'
        >
          Transport
        </MenuLink>
      </MenuContainer>
      <Container sx={{ mb: '40px' }}>
        <Box>
          <Typography
            variant='h4'
            component='h1'
            gutterBottom
            sx={{ m: '40px auto 60px', textAlign: 'center', fontWeight: 700 }}
          >
            EtherLuxe NFT Marketplace
          </Typography>
          <Routes>
            <Route exact path='/characters' element={<Characters />} />
            <Route exact path='/weapon' element={<Weapon />} />
            <Route exact path='/transport' element={<Transport />} />
            <Route path='*' element={<Characters />} />
          </Routes>
        </Box>
      </Container>
    </PageContainer>
  )
}

export default Marketplace
