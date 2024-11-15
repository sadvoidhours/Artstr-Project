import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Product from '../components/product';

function Dashboard() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                return setMessage('No token found, please log in.');
            }
            try {
                const response = await axios.get('http://localhost:5000/auth/dashboard', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setMessage(response.data.message);
            } catch (error) {
                console.error('Error fetching dashboard data', error);
                if (error.response && error.response.status === 403) {
                    setMessage('Access forbidden: Admins cannot access this page.');
                } else {
                    setMessage('You are not authorized or token expired.');
                }
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>{message}</h1>
            <Product />
        </div>
    );
}

export default Dashboard;