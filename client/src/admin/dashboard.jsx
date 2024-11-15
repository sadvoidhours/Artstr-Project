import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setMessage('No token found, please log in.');
                return navigate('/');
            }

            try {
                const response = await axios.get('http://localhost:5000/auth/admin-only', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setMessage(response.data.message);
            } catch (error) {
                console.error('Error fetching admin data', error);
                setMessage('Access denied: Admins only.');
                navigate('/dashboard');
            }
        };

        fetchData();
    }, [navigate]);

    return <h1>{message}</h1>;
}

export default AdminDashboard;
