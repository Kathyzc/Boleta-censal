import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './firebase/firebase';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';

import TablaHistorial from './components/tablaHistorial';
import Auth from './components/Auth';
import PaginaPrincipal from './components/paginaPrincipal';
import EstadisticasVivienda from './components/ComponentesPrincipales/EstadisticasVivienda';
import EstadisticasPoblacion from './components/ComponentesPrincipales/EstadisticasPoblacion';
import FormularioVivienda from './components/ComponentesPrincipales/FormularioVivienda';
import FormularioPoblacion from './components/ComponentesPrincipales/FormularioPoblacion';
import Proyecciones from './components/ComponentesPrincipales/Proyecciones';
import GraficaPiramide from './components/Sub-componentes-estadisticas/GraficaPiramide';
import Simulacion from './components/ComponentesPrincipales/Simulacion'; 
import Distribuciones from './components/ComponentesPrincipales/Distribuciones';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <Router>
     
    <Routes>
      <Route path='/paginaPrincipal' element={<PaginaPrincipal/>}/>
      <Route path='/tablaHistorial' element={<TablaHistorial/>}/>
      <Route path='/FormularioVivienda' element={<FormularioVivienda/>}/>
      <Route path='/FormularioPoblacion' element={<FormularioPoblacion/>}/>
      <Route path='/EstadisticasVivienda' element={<EstadisticasVivienda/>}/>
      <Route path='/EstadisticasPoblacion' element={<EstadisticasPoblacion/>}/>
      <Route path='/Proyecciones' element={<Proyecciones/>}/>
      <Route path='/Simulacion' element={<Simulacion/>}/>
      <Route path='/Distribuciones' element={<Distribuciones/>}/>
     
      <Route path='/' element={<Auth/>}/>
    </Routes>
 </Router>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
