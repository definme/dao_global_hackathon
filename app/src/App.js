import * as React from 'react'
import styled from 'styled-components'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Main from './pages/Main'
import Marketplace from './pages/Marketplace'
import Profile from './pages/Profile'
import DAO from './pages/DAO'
import AdminPage from './pages/AdminPage'

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #161819;
  background-image: url(${require(`./images/BG.png`)});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
`

function App() {
  return (
    <AppContainer>
      <Header />
      <Routes>
        <Route exact path='/' element={<Main />} />
        <Route path='/marketplace/*' element={<Marketplace />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/dao' element={<DAO />} />
        <Route path='/admin' element={<AdminPage />} />
        <Route path='*' element={<Main />} />
      </Routes>
      <Footer />
    </AppContainer>
  )
}

export default App
