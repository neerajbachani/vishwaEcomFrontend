import React, { useState } from 'react';
// import { api } from '../../../Config/ApiConfig';
import { useNavigate } from 'react-router-dom';

const AdminLogin = ({ handleAdminLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await handleAdminLogin(email, password);
            navigate("/admin");
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    return (
        <div>
            <h2>Admin Login</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default AdminLogin;
