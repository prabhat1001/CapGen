import React from 'react'
import './index.css'
import Generator from './components/Generator'
import NavBar from './components/NavBar'

const App = () => {
  return (
    <div className='app-cont'>
      <NavBar />
      <Generator />
    </div>
  )
}

export default App