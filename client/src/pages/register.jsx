import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'  

export default function Register() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    username: '',
    email: '',
    password: ''
  })

  const registerUser = async (e) => {
    e.preventDefault()
    const {username, email, password} = data
    try {
      const {data: responseData} = await axios.post('/register', {
        username, email, password
      })
      if(responseData.error){
        toast.error(responseData.error)
      } else {
        setData({ username: '', email: '', password: '' })
        toast.success('User registered successfully')
        navigate('/login')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div class = "Register">
      <h1>Register</h1>
      <form onSubmit={registerUser}>
      <label htmlFor="username">Username</label>
      <input type="text" id="username" placeholder='Enter your Username' value={data.username} onChange={(e) => setData({...data, username: e.target.value})}/>
      <label htmlFor="email">Email</label> 
      <input type="email" id="email" placeholder='Enter your Email'value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
      <label htmlFor="password">Password</label>
      <input type="password" id="password" placeholder='Enter your Password' value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
      <button type='submit'>Register</button>
      </form>
    </div>
  )
}
