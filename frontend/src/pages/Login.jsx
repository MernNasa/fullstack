import axios from 'axios'
import React from 'react'

const Login = () => {
    const loginFunction=async () => {
        const {data}=await axios.post("http://localhost:8080/login",{email:"badheisanjana2@gmail.com",password:"456"})
        console.log(data)
        localStorage.setItem("jwt_token",JSON.stringify(data.jwttoken))
    }

  return (
    <div>
        <h1>Login</h1>
        <button onClick={loginFunction}>Login</button>
    </div>
  )
}

export default Login