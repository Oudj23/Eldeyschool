import React from 'react';
import Cours from '../../Components/Cours/Cours';
import Math_Icon from '../../assets/Cours_Icon/Math_Icon.png'
import Français_Icon from '../../assets/Cours_Icon/Français_Icon.png'
import Arabe_Icon from '../../assets/Cours_Icon/Arabe_Icon.png'
import Anglais_Icon from '../../assets/Cours_Icon/Anglais_Icon.png'
import Science_Icon from '../../assets/Cours_Icon/Science_Icon.png'
import Physique_Icon from '../../assets/Cours_Icon/Physique_Icon.png'
import Gp_Icon from '../../assets/Cours_Icon/GP_Icon.png'
import Gc_Icon from '../../assets/Cours_Icon/Gc_Icon.png'
import Gm_Icon from '../../assets/Cours_Icon/GM_Icon.png'
function Lycée() {
    return (
        <div className='Formation_Page'>
            <Cours src={Math_Icon} title={'Math'}/>
            <Cours src={Arabe_Icon} title={'Arabe'}/>
            <Cours src={Français_Icon} title={'Français'}/>
            <Cours src={Anglais_Icon} title={'Anglais'}/>
            <Cours src={Science_Icon} title={'Science'}/>
            <Cours src={Physique_Icon} title={'Physique'}/>
            <Cours src={Gp_Icon}title={'Génie des Procédés'}/>
            <Cours src={Gc_Icon}title={'Génie Civil'}/>
            <Cours src={Gm_Icon}title={'Génie Mécanique'}/>
        </div>
    );
}

export default Lycée;