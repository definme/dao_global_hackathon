import * as React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Box from '@mui/material/Box'
import Main from './pages/Main'

function App() {
  return (
    <Box
      sx={{
        background: 'linear-gradient(45deg, black, transparent)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header />
      <Main />
      <Footer />
    </Box>
  )
}

export default App
