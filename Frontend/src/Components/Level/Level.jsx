import React from 'react';
import './Level.css'
function Level({src,title}) {
    return (
        <div className='Level'>
            <div className='Level-img-container'>
                <img src={src} className='Level-img'/>
            </div>
            <h1 className='Level-Title'>{title}</h1>
        </div>
    );
}

export default Level;