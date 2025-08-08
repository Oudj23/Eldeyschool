import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Components/Header/Header';
import './Index.css'
function Index() {
    return (
        <div className='Index'>
            <Header/>
            <Outlet/>
        </div>
    );
}

export default Index;