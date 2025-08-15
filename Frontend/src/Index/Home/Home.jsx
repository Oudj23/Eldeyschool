import React from 'react';
import './Home.css'
import Home_Hero_Section from './Home_Sections/Home_Hero-Section/Home_Hero_Section';
import Why_Us from './Home_Sections/Why_Us/Why_Us';
import Choose_Level_Section from './Home_Sections/Choose_Level_Section/Choose_Level_Section';
import Populaire_Formation from './Home_Sections/Populaire_Formation/Populaire_Formation';
import Footer from '../../Components/Footer/Footer.jsx';
import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate();

    // ✅ Check if token exists on component mount
    useEffect(() => {
        const token = localStorage.getItem('deyschooltoken');
        if (token) {
            navigate('/user/dashboard');
        }
    }, [navigate]);
    return (
        <div className='Home-Container'>
            <Home_Hero_Section/>
            <Why_Us/>
            <Choose_Level_Section/>
            <Populaire_Formation/>
            <Footer/>
        </div>
    );
}

export default Home;