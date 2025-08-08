import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import Icon from '../../assets/Logo.png'
function Header() {
    const [showFormations, setShowFormations] = useState(false);
    const [showCours, setShowCours] = useState(false);

    return (
        <header className='Header-Container'>

            <Link to='/' className='Header-Links'>Accueil</Link>

            <div
                className='Header-Dropdown'
                onMouseEnter={() => setShowFormations(true)}
                onMouseLeave={() => setShowFormations(false)}
            >
                <span className='Header-Links'>Formations</span>
                {showFormations && (
                    <div className='Dropdown-Content'>
                        <Link to='/formations/langues-etrangeres'>Langues Étrangères</Link>
                        <Link to='/formations/professionnel'>Formation Professionnelle</Link>
                    </div>
                )}
            </div>
            <img src={Icon} className='Icon' />
            <div
                className='Header-Dropdown'
                onMouseEnter={() => setShowCours(true)}
                onMouseLeave={() => setShowCours(false)}
            >
                <span className='Header-Links'>Niveaux scolaires</span>
                {showCours && (
                    <div className='Dropdown-Content'>
                        <Link to='/Niveaux/Primaire'>Primaire</Link>
                        <Link to='/Niveaux/Cem'>Cem</Link>
                        <Link to='/Niveaux/Lycée'>Lycée</Link>
                    </div>
                )}
            </div>
            <Link to='/connexion' className='Header-Links'>Connexion</Link>
        </header>
    );
}

export default Header;
