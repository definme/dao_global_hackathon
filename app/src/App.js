import * as React from 'react'
import Header from './components/Header'
import Main from './pages/Main'

function App() {
  return (
    <div
      style={{
        background: 'linear-gradient(45deg, black, transparent)',
        minHeight: '100vh',
      }}
    >
      <Header />
      <Main />
    </div>
  )
}

export default App
