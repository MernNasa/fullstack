import React, { useEffect } from 'react'
import axios from "axios"
const App = () => {
    const fdata=async () => {
        const {data}=await axios.get("http://localhost:8080/allusers")
        console.log(data)
    }
    useEffect(()=>{
        fdata()
    },[])
  return (
    <div>App</div>
  )
}

export default App