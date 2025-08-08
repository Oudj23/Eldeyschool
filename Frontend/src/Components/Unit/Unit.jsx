import React from 'react';
import './Unit.css'
import UnitImg from '../../assets/Admins_Icons/Chapter.png'
function Unit({title}) {
    return (
        <div className='Unit'>   
        <h1 className='Unit-title'>{title}</h1>
            <img src={UnitImg} className='UnitImg'/>
         
        </div>
    );
}

export default Unit;