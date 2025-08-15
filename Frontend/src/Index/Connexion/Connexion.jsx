import React, { useState } from 'react';
import './Connexion.css';
import { useNavigate } from 'react-router-dom'
function Connexion() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const handleLogin = async () => {
        try {
            const response = await fetch('https://eldeyschoolbackend.onrender.com/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('deyschooltoken', data.token);
                // Use replace instead of navigate to prevent history stack issues
                navigate('/user/dashboard'); // Full page reload
            } else {
                alert(data.message);
            }
        } catch (err) {
            console.error(err);
            alert('An error occurred during login');
        }
    };
    return (
        <div className='Connexion-Container'>
            <div className='Connexion-Box'>
                <h1 className='Connexion-Title'>Se connecter</h1>
                <input
                    type='email'
                    placeholder='Adresse e-mail'
                    className='Connexion-Input'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type='password'
                    placeholder='Mot de passe'
                    className='Connexion-Input'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className='Connexion-Button' onClick={handleLogin}>
                    Connexion
                </button>
            </div>
        </div>
    );
}

export default Connexion;
