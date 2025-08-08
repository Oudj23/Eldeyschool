import React from 'react';
import './WhyUsComponent.css'
function WhyUsComponent({src,title,des}) {
    return (
        <div className='WhyUsComponent'>
            <div className='WhyUsComponent-img-container'>
                <img src={src} className='WhyUsComponent-img'/>
            </div>
            <h1 className='WhyUsComponent-Title'>{title}</h1>
            <p className='WhyUsComponent-dis'>{des}</p>
        </div>
    );
}

export default WhyUsComponent;