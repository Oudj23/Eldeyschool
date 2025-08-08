import React from 'react';
import './Cours.css'
function Cours({src,title}) {
    return (
        <div className='Cours'>
            <div className='Cours-img-container'>
                <img src={src} className='Cours-img'/>
            </div>
            <h1 className='Cours-Title'>{title}</h1>
        </div>
    );
}

export default Cours;