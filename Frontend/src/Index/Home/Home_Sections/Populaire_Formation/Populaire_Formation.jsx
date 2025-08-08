import React from 'react';
import './Populaire_Formation.css'
import Formation from '../../../../Components/Formation/Formation';
import Bureautique_Image from '../../../../assets/Formation-Images/bureautique.jpg'
import Agent_De_Voyage_Image from '../../../../assets/Formation-Images/agent_de_voyage.jpg'
import Anglais_Formation_Image from '../../../../assets/Formation-Images/Anglais_Formation.jpg'
function Populaire_Formation() {
    return (
        <div className='Populaire_Formation'>
            <h1 className='Populaire_Formation_Title'>Formations Populaires</h1>
            <p className='Populaire_Formation_des'>Les formations les plus suivies par notre communauté</p>
            <div className="Formations_Container">
                <Formation
                    src={Bureautique_Image}
                    title={'Formation Bureautique'}
                    durée={
                        <>
                            Durée au choix : une semaine accélérée<br />
                            ou un mois (chaque samedi)
                        </>
                    }

                />
                <Formation
                    src={Agent_De_Voyage_Image}
                    title={'Formation Agent De Voyage'}
                    durée={
                        <>
                            Durée au choix : une semaine accélérée<br />
                            ou un mois (chaque samedi)
                        </>
                    }

                />
                 <Formation
                    src={Anglais_Formation_Image}
                    title={"Formation d'Anglais"}
                    btn={true}

                />

            </div>
        </div>
    );
}

export default Populaire_Formation;