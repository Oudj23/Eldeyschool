import React from 'react';
import Index from './Index/Index'
import {Routes,Route} from 'react-router-dom'
import './App.css'
import './Style_Variables/Font.css'
import Home from './Index/Home/Home';
import Formation_Langue_Page from './Index/Formations_Langue_Page/Formations_Langue_Page'
import Formation_Professionel from './Index/Formation_Professionel/Formation_Professionel';
import Primaire from './Index/Primaire/Primaire';
import Cem from './Index/Cem/Cem';
import Lycée from './Index/Lycée/Lycée'
import Connexion from './Index/Connexion/Connexion';
import Admin_Dashboard from './Admin/Admin_Dashboard/Admin_Dashboard.jsx';
import Add_Student from './Admin/Add_Student/Add_Student.jsx';
import Add_Cours from './Admin/Add_Cours/Add_Cours.jsx';
import Dashboard from './Student/Dashboard.jsx';
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Index />} >
          <Route index element={<Home/>}/>
          <Route path='/formations/langues-etrangeres' element={<Formation_Langue_Page/>}/>
          <Route path='formations/professionnel' element={<Formation_Professionel/>}/>
          <Route path='Niveaux/Primaire' element={<Primaire/>}/>
          <Route path='/Niveaux/Cem' element={<Cem/>}/>
          <Route path='/Niveaux/Lycée' element={<Lycée/>}/>
        <Route path='/Connexion' element={<Connexion/>}/>
        </Route>
        <Route path='/admin' element={<Admin_Dashboard/>}>
            <Route path='student'  element={<Add_Student/>}/>
            <Route path='cours'  element={<Add_Cours/>}/>
        </Route>
        <Route path='user/dashboard' element={<Dashboard/>}/>
        
      </Routes>
    </div>
  );
}

export default App;