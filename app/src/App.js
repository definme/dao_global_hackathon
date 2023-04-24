import * as React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Box from '@mui/material/Box'
import Main from './pages/Main'
import Marketplace from './pages/Marketplace'
import Profile from './pages/Profile'
import DAO from './pages/DAO'

function App() {
  return (
    <Box
      sx={{
        background: '#161819',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header />
      <Routes>
        <Route exact path='/' element={<Main />} />
        <Route path='/marketplace/*' element={<Marketplace />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/dao' element={<DAO />} />
        <Route path='*' element={<Main />} />
      </Routes>
      <Footer />
    </Box>
  )
}

export default App
