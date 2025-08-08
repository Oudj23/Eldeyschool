import React from 'react';
import './Why_Us.css'
import WhyUsComponent from '../../../../Components/WhyUsComponent/WhyUsComponent';
import book from '../../../../assets/WhyUs_Icons/book.png'
import group from '../../../../assets/WhyUs_Icons/group.png'
import trend from '../../../../assets/WhyUs_Icons/trend (1).png'
import award from '../../../../assets/WhyUs_Icons/award.png'
function Why_Us() {
    return (
        <div className='Why-Us-Container'>
            <h1 className='Why-Us-Title'>Pourquoi Choisir Eldey School ?</h1>
            <p className='Why-Us-Des'>Une expérience d'apprentissage complète conçue pour votre réussite</p>
        <div className='WhyUsComponent-container' id='levels_container'>
            <WhyUsComponent src={book} title={'Cours Interactifs'} des={'Apprenez avec des vidéos, quiz et exercices pratiques'}/>
            <WhyUsComponent src={group} title={'Communauté'} des={"Échangez avec d'autres apprenants et des experts"}/>
            <WhyUsComponent src={award} title={'Certifications'} des={'Obtenez des badges et certificats reconnus'}/>
            <WhyUsComponent src={trend} title={'Progression'} des={"Suivez vos progrès et statistiques d'apprentissage"}/>

        </div>
        </div>
    );
}

export default Why_Us;