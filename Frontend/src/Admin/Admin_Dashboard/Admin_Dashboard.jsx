import React from 'react';
import {Link, Outlet} from 'react-router-dom'
import './Admin_Dashboard.css'
function Admin_Dashboard(props) {
    return (
        <div>
            <nav>
                <Link to='/admin/student' className='Nav-links'>Étudiants</Link>
                <Link to='/admin/cours' className='Nav-links'>Les Cours</Link>
            </nav>
            <Outlet/>
        </div>
    );
}

export default Admin_Dashboard;