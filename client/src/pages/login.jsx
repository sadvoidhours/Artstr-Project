import React from 'react'
import { useState } from 'react'
import axios from 'axios'

export default function login() {
  const [data, setData] = useState({
    email: '',
    password: ''
  })

const LoginUser = (e) => {
  e.preventDefault()
  axios.get ('/')
}

  return (
    <div class = "login">
      <h1>Login</h1>
      <form onSubmit={LoginUser}>
      <label htmlFor="email">Email</label>
      <input type="email" id="email" placeholder='Enter your Email' value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
      <label htmlFor="password">Password</label>
      <input type="password" id="password" placeholder='Enter your Password' value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
      <button type='submit'>Login</button>
      </form>
    </div>
  )
}
