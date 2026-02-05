import axios from 'axios'
import React from 'react'

const Profile = () => {
    const getProfile=async () => {
        const jwt_token=JSON.parse(localStorage.getItem("jwt_token"))
        const {data}=await axios.get("http://localhost:8080/profile",{
            headers:{
                Authorization:`Bearer ${jwt_token}`
            }
        })
        console.log(data)
    }
  return (
    <div>
        <h1>Get Profile</h1>
        <button onClick={getProfile}>Get Profile</button>
    </div>
  )
}

export default Profile