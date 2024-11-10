import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: ''
  });

  const LoginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password
      });
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setData({ email: '', password: '' });
        toast.success('Login successful');
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={LoginUser}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder='Enter your Email' value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder='Enter your Password' value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}