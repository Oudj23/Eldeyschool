import React from 'react';
import Formation from '../../Components/Formation/Formation';
import EduCreche from '../../assets/Formation-Images/educreche.jpg';
import Commerce from '../../assets/Formation-Images/commerce.jpg';
import Tourisme from '../../assets/Formation-Images/tourisme.jpg';
import RH from '../../assets/Formation-Images/rh.jpg';
import Marketing from '../../assets/Formation-Images/Marketing.jpg';
import SIG from '../../assets/Formation-Images/sig.jpg';
import HSE from '../../assets/Formation-Images/hse.jpg';
import Mobile from '../../assets/Formation-Images/mobile.jpg';
import PC from '../../assets/Formation-Images/pc.jpg';
import Medical from '../../assets/Formation-Images/medicale.jpg';
import Lab from '../../assets/Formation-Images/lab.jpg';
import Dental from '../../assets/Formation-Images/dental.jpg';
import Voyage from '../../assets/Formation-Images/agent_de_voyage.jpg';
import Secretaire from '../../assets/Formation-Images/secretariat.jpg';
import Informatique from '../../assets/Formation-Images/informatique.jpg';
import Infographie from '../../assets/Formation-Images/infographie.jpg';
import Pharmacie from '../../assets/Formation-Images/pharmacie.jpg';
import Douane from '../../assets/Formation-Images/douane.jpg';
import Transit from '../../assets/Formation-Images/transit.jpg';
import Compta from '../../assets/Formation-Images/compta.jpg';
import TSSup from '../../assets/Formation-Images/technicien.jpg';
import Reseau from '../../assets/Formation-Images/reseau.jpg';

function Formation_Professionel() {
    return (
        <div className='Formation_Page'>

      <Formation
  src={EduCreche}
  title="Éducatrice de crèche"
  durée="Durée : 1 semaine"
  description="Apprenez les bases de l'accompagnement de la petite enfance dans les crèches et garderies."
/>

<Formation
  src={Mobile}
  title="Réparateur téléphone portable"
  durée="Durée : 1 semaine"
  description="Initiez-vous à la réparation des smartphones : diagnostic, remplacement de composants, outils de base."
/>

<Formation
  src={PC}
  title="Réparateur d'ordinateurs portable (PC)"
  durée="Durée : 1 semaine"
  description="Formation pratique pour dépanner, démonter, diagnostiquer et réparer les ordinateurs portables."
/>

<Formation
  src={Dental}
  title="Assistant(e) dentaire"
  durée="Durée : 1 semaine"
  description="Découvrez le rôle d’assistant(e) au cabinet dentaire : hygiène, accueil, outils et aide au praticien."
/>

<Formation
  src={Pharmacie}
  title="Vendeur en pharmacie"
  durée="Durée : 1 semaine"
  description="Apprenez les fondamentaux de la vente et de l’organisation dans un espace de pharmacie/parapharmacie."
/>

<Formation
  src={Secretaire}
  title="Secrétariat"
  durée="Durée : 1 mois"
  description="Maîtrisez les tâches administratives : rédaction, classement, accueil téléphonique et gestion de planning."
/>

<Formation
  src={Informatique}
  title="Informatique"
  durée="Durée : 1 mois"
  description="Formation généraliste : Windows, Word, Excel, navigation internet, cybersécurité de base."
/>

<Formation
  src={Infographie}
  title="Infographie"
  durée="Durée : 1 mois"
  description="Introduction à Photoshop, Illustrator et InDesign pour la création de supports visuels attractifs."
/>

<Formation
  src={Medical}
  title="Assistant(e) médicale"
  durée="Durée : 1 mois"
  description="Initiez-vous à la gestion des dossiers médicaux, accueil des patients et suivi administratif."
/>

<Formation
  src={Lab}
  title="Assistant(e) laboratoire"
  durée="Durée : 1 mois"
  description="Découvrez les bases des analyses biologiques, manipulation d’échantillons et normes de sécurité."
/>

<Formation
  src={Douane}
  title="Déclarant en douane"
  durée="Durée : 1 mois"
  description="Apprenez à remplir les documents douaniers et à connaître la réglementation import/export."
/>

<Formation
  src={Transit}
  title="Agent de transit"
  durée="Durée : 1 mois"
  description="Formation logistique : suivi des marchandises, relations entre transporteurs, douanes et clients."
/>

<Formation
  src={Commerce}
  title="Commerce international"
  durée="Durée : 3 mois"
  description="Développez vos compétences en gestion des opérations d’import/export et en négociation internationale."
/>

<Formation
  src={Tourisme}
  title="Tourisme et hôtellerie"
  durée="Durée : 3 mois"
  description="Apprenez les fondamentaux de l’accueil, de la gestion hôtelière et de l’organisation de séjours."
/>

<Formation
  src={SIG}
  title="ARC-GIS et QGIS"
  durée="Durée : 3 mois"
  description="Formation aux logiciels de cartographie SIG pour la gestion et l’analyse spatiale de données géographiques."
/>

<Formation
  src={Compta}
  title="Comptabilité"
  durée="Durée : 3 mois"
  description="Maîtrisez les bases de la comptabilité générale, bilans, journaux et logiciels comptables."
/>

<Formation
  src={Compta}
  title="Pc paie / Pc compta"
  durée="Durée : 3 mois"
  description="Apprenez à utiliser des logiciels professionnels pour la gestion de la paie et de la comptabilité."
/>

<Formation
  src={Marketing}
  title="Marketing et Marketing Digital"
  durée="Durée : 3 mois"
  description="Comprenez les outils modernes de promotion digitale, branding et stratégie marketing multicanal."
/>

<Formation
  src={RH}
  title="Ressources humaines GRH"
  durée="Durée : 3 mois"
  description="Formation RH : recrutement, droit du travail, paie, gestion administrative du personnel."
/>

<Formation
  src={Voyage}
  title="Agent de voyage"
  durée="Durée : 6 mois"
  description="Organisez des voyages et séjours : réservation, relation client, connaissance des destinations."
/>

<Formation
  src={HSE}
  title="Superviseur / Inspecteur / Agent HSE"
  durée="Durée : 6 mois"
  description="Maîtrisez les normes de sécurité, d’hygiène et environnementales en entreprise ou chantier."
/>

<Formation
  src={TSSup}
  title="Technicien Supérieur"
  durée="Durée : 24 mois"
  description="Formation approfondie sur 2 ans pour devenir technicien qualifié dans divers secteurs professionnels."
/>

<Formation
  src={Reseau}
  title="Programmation en administration et sécurité des réseaux informatiques"
  durée="Durée : 24 mois"
  description="Devenez expert en administration réseau, cybersécurité, protocoles, firewalls, et Linux/Windows Server."
/>

        </div>
    );
}

export default Formation_Professionel;
