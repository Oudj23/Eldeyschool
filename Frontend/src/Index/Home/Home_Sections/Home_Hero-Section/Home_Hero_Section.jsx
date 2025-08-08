import React from 'react';
import DarkVeil from '../../../../Components/DarkVeil/DarkVeil';
import './Home_Hero_Section.css';
import {Link} from 'react-router-dom'
function Home_Hero_Section() {
    return (
        <div className='Home-Hero-Section'>
            <div className='Home_Hero_Section_background'>
                <DarkVeil />
            </div>
            <div className='Home-Hero-Section-Contents'>
                <div className='Home-Hero-Section-Contents-Text-Container'>
                    <h1 className='Home-Hero-Section-Text'>Apprenez, Grandissez,<br/>Réussissez</h1>
                <p className='Home-Hero-Section-Text-Des'>Découvrez des milliers de cours  créés par des experts.<br/> Développez vos compétences à votre rythme.</p>
                </div>
                <div className='Home-Hero-Section-Contents-Buttons-Container'>
                    <Link to={'/formations/professionnel'}><button className='Formation_Button'>Parcourir les Formations</button></Link>
                    <a href='#levels_container'><button className='Cours_Button'>Parcourir les Cours</button></a>
                </div>
            </div>
        </div>
    );
}

export default Home_Hero_Section;
