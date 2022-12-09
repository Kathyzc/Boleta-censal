import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import React from 'react'
import {  NavLink} from 'react-router-dom';

import '../../estilos/Menu.css';

function Menu() {
  const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
        } else {
          console.log('No ha iniciado sesión');
          //window.location.href = 'index.html';
        }
      });
  const logout = async ()=>{
    await signOut(auth);
    console.log("funciona el logout");
    //navegate("/");
  }

  const cambiarClass = (e) =>{
    console.log("si funciona");
    const elemento = document.getElementById('contenedor-desplegable');
    const elementEstadisticas = document.getElementById('estadisticas');
    const elementHome = document.getElementById('home');
    const elementForm = document.getElementById('form');
    const elementHistorial = document.getElementById('historial');
    console.log("------------------------")
    console.log(elemento);
    if(elemento.className === 'activo'){
      elemento.className = 'inactivo';
      elementForm.className = 'link';
      elementHistorial.className = 'link';
      elementHome.className = 'link';
    }else {
      elemento.className = 'activo';  
    }
  }
  return (
    <div className='contenedor-menu'>
        <span className='link-logo'>CENSO 2022</span>

       <li className='links'>
            <NavLink className='link' id='form'  to='/Formulario'>Formulario</NavLink >
            <NavLink className='link' id='simulacion'  to='/Simulacion'>Simulación</NavLink >
            <NavLink className='link' id='distribuciones'  to='/Distribuciones'>Distribuciones</NavLink > 
            <NavLink className='link' id='proyecciones'  to='/Proyecciones'>Proyecciones</NavLink > 
             
            <div className='conetendor-todo-desplegable'>
              <div className='link-estadisticas'  onClick={cambiarClass}>
                <div className='link' id='estadisticas'>Estadísticas </div>
                <i className='fa-solid fa-angle-down'></i>
              </div>
              <span className='activo' id='contenedor-desplegable'>
                
                <NavLink className='link2'to='/EstadisticasVivienda'>Estadísticas de Vivienda</NavLink>
                <NavLink className='link2'to='/EstadisticasPoblacion'>Estadísticas de Población</NavLink>
              </span>

 
             
            </div>
          
           
           
            
            
       </li>
      <NavLink to='/'><button  onClick={logout} className='boton-Cerrar-Sesion'>Cerrar sesión</button></NavLink> 
    </div>
  )
}

export default Menu