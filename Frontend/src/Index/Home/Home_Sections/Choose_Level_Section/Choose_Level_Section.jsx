import React from 'react';
import './Choose_Level_Section.css'
import Level from '../../../../Components/Level/Level';
import Primary_Icon from '../../../../assets/Level-Icons/primary (1).png'
import Cem_Icon from '../../../../assets/Level-Icons/cem.png'
import Lycée_Icon from '../../../../assets/Level-Icons/lycee.png'
import {Link} from 'react-router-dom'

function Choose_Level_Section() {
    return (
        <div className='Choose_Level_Section' >
            <h1  className='Choose_Level_Section_Title'>Choisissez votre niveau scolaire</h1>
            <div className='Level-container'>
                <Link to={'/Niveaux/Primaire'}><Level src={Primary_Icon} title={'Primaire'}/></Link>
                <Link to={'/Niveaux/Cem'}><Level src={Cem_Icon} title={'Cem'}/></Link>
                <Link to={'/Niveaux/Lycée'}><Level src={Lycée_Icon} title={'Lycée'}/></Link>

            </div>
        </div>
    );
}

export default Choose_Level_Section;