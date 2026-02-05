import React, { useEffect } from 'react'
import axios from "axios"
import Login from './pages/Login'
import Profile from './pages/Profile'
const App = () => {
    
  return (
    <div>
      <Login/>
      <hr />
      <Profile/>
    </div>
  )
}

export default App