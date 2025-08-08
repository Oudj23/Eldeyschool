import React from 'react';
import './Formations_Langue_Page.css'
import Formation from '../../Components/Formation/Formation';
import Anglais_Formation_Image from '../../assets/Formation-Images/Anglais_Formation.jpg'
function Formation_Page() {
    return (
        <div className='Formation_Page'>
              <Formation
                    src={Anglais_Formation_Image}
                    title={"Formation d'Anglais"}
                    btn={false}
                    level={'A1'}
                    durée={'Chaque lundi et mercredi (17:00–19:00)'}
                />
                <Formation
                    src={Anglais_Formation_Image}
                    title={"Formation d'Anglais"}
                    btn={false}
                    level={'A2'}
                    durée={'Chaque Mardi (16:00–18:00)'}
                />
                <Formation
                    src={Anglais_Formation_Image}
                    title={"Formation d'Anglais"}
                    btn={false}
                    level={'B1'}
                    durée={'Chaque Mardi (16:00–18:00)'}
                />
        </div>
    );
}

export default Formation_Page;