import React from 'react';
import './Formation.css';
import { Link } from 'react-router-dom';

function Formation({ src, title, durée, level, btn, description }) {
    return (
        <div className='Formation-Container'>
            <img src={src} className='Formation-Img' alt={title} />
            <h1 className='Formation-Title'>{title}</h1>
            {level && <p className='Formation-level'>{level}</p>}
            <p className='Formation-durée'>{durée}</p>
            <p className='Formation-description'>{description}</p>
            {btn && (
                <Link to={'/formations/langues-etrangeres'}>
                    <button className='Formation_Btn'>Voir les Niveaux Disponibles</button>
                </Link>
            )}
        </div>
    );
}

export default Formation;
