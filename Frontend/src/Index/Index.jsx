import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Components/Header/Header';
import './Index.css'
import { useNavigate } from 'react-router-dom'
function Index() {
    const navigate = useNavigate();

    // ✅ Check if token exists on component mount
    useEffect(() => {
        const token = localStorage.getItem('deyschooltoken');
        if (token) {
            navigate('/user/dashboard');
        }
    }, [navigate]);
    return (
        <div className='Index'>
            <Header/>
            <Outlet/>
        </div>
    );
}

export default Index;