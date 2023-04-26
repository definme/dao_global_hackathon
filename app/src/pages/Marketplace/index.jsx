import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Characters from './Characters';
import Weapon from './Weapon';
import Transport from './Transport';
import { MenuContainer, MenuLink, PageContainer } from './Marketplace.styled';

function Marketplace() {
  const location = useLocation();

  const [currentLocation, setCurrentLocation] = useState({
    characters: false,
    weapon: false,
    transport: false,
  });

  useEffect(() => {
    if (location.pathname.includes('/weapon')) {
      setCurrentLocation({
        characters: false,
        weapon: true,
        transport: false,
      });
    } else if (location.pathname.includes('/transport')) {
      setCurrentLocation({
        characters: false,
        weapon: false,
        transport: true,
      });
    } else {
      setCurrentLocation({
        characters: true,
        weapon: false,
        transport: false,
      });
    }
  }, [location]);

  return (
    <PageContainer>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <MenuContainer>
          <MenuLink
            current={currentLocation.characters.toString()}
            to='/marketplace/characters'>
            Characters
          </MenuLink>
          <MenuLink
            current={currentLocation.weapon.toString()}
            to='/marketplace/weapon'>
            Weapon
          </MenuLink>
          <MenuLink
            current={currentLocation.transport.toString()}
            to='/marketplace/transport'>
            Transport
          </MenuLink>
        </MenuContainer>
      </div>
      <Container sx={{ mb: '230px' }} maxWidth= '1200px'>
        <Box>
          <Routes>
            <Route exact path='/characters' element={<Characters />} />
            <Route exact path='/weapon' element={<Weapon />} />
            <Route exact path='/transport' element={<Transport />} />
            <Route path='*' element={<Characters />} />
          </Routes>
        </Box>
      </Container>
    </PageContainer>
  );
}

export default Marketplace;
