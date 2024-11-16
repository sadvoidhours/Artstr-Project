import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const registerUser = async (e) => {
        e.preventDefault();
        const { firstName, lastName, email, password } = data;

        try {
            const response = await axios.post('http://localhost:5000/auth/register', {
                firstName,
                lastName,
                email,
                password,
            });

            if (response.data.message) {
                toast.success(response.data.message);
                setData({ firstName: '', lastName: '', email: '', password: '' });
                navigate('/login');
            } else {
                toast.error('Registration failed. Please try again.');
            }
        } catch (error) {
            console.error(error);
            toast.error('Registration failed. Please try again.');
        }
    };

    return (
        <div className="Register">
            <h1>Register</h1>
            <form onSubmit={registerUser}>
                <label htmlFor="firstName">First Name</label>
                <input
                    type="text"
                    id="firstName"
                    placeholder="Enter your First Name"
                    value={data.firstName}
                    onChange={(e) => setData({ ...data, firstName: e.target.value })}
                    required
                />
                <label htmlFor="lastName">Last Name</label>
                <input
                    type="text"
                    id="lastName"
                    placeholder="Enter your Last Name"
                    value={data.lastName}
                    onChange={(e) => setData({ ...data, lastName: e.target.value })}
                    required
                />
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Enter your Email"
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                    required
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Enter your Password"
                    value={data.password}
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                    required
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}