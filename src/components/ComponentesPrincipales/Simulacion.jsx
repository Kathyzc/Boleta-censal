import { collection, doc, getCountFromServer, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import React from 'react'
import { useState } from 'react';
import Menu from '../Sub-componentes/Menu';
import GraficaBarras from '../Sub-componentes-estadisticas/GraficaBarras';
import GraficaDona from '../Sub-componentes-estadisticas/GraficaDona';
import '../../estilos/Estadisticas.css';
import GraficaLinea from '../Sub-componentes-estadisticas/GraficaLinea';

var varX=[];
var varY=[];



function Simulacion() {
  const [variableX,setVariableX]=useState("");
  const [variableY,setVariableY]=useState("");
  const [grafica, setGrafica] = useState(<><GraficaBarras titulo= {variableX}
    barras = {[]}
    cantidadbarras={[varY]}
    color='rgba(53, 162, 235, 0.5)'/></>);
  const arrayColores = [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(100, 192, 192, 1)',
        'rgba(153, 255, 255, 1)',
        'rgba(255, 255, 64, 1)',
      ]
     
  function graficar(){
       setGrafica(<><GraficaBarras titulo= {variableX}
        barras = {varX}
        cantidadbarras={varY}
        color='rgba(53, 162, 235, 0.5)'/></>);
  }

  return (
    
    <div className='contenedor-e'>
        <Menu/>
        <h1 className='titulo'>Simulación</h1>
        
        <div className='contenedor-estadisticas'>
        <h3>Simular Y:</h3>
        <select className='input' onChange={(event)=>setVariableY(event.target.value)} defaultValue={'DEFAULT'}>
          <option value={"DEFAULT"} disabled >Seleccione una opción</option>
          <option value="Cantidad de hijos">Cantidad de hijos</option>
          <option value="Cantidad de pesonas con casa propia">Cantidad de pesonas con casa propia</option>
          <option value="Viviendas con acceso a internet">Viviendas con acceso a internet</option>
          <option value="Cantidad de personas en situación de calle">Cantidad de personas en situación de calle</option>
          <option value="Viviendas con acceso a alcantarillado">Viviendas con acceso a alcantarillado</option>
          <option value="Viviendas con accceso a gas domiciliario">Viviendas con accceso a gas domiciliario</option>
        
          </select>
        <h3>Respecto a X:</h3>
        <select className='input'onChange={(event)=>setVariableX(event.target.value)} defaultValue={'DEFAULT'}>
          <option value={"DEFAULT"} disabled>Seleccione una opción</option>
          <option value="Grupos de edades">Grupos de edades</option>
          <option value="Tenencia de vivienda: Casa propia">Tenencia de vivienda</option>
        </select>
        <button className='btn-generar' onClick={graficar}>Generar</button>

        </div>
        

        
        <div className='contenedor'>
         {grafica}
        </div>
       
    </div>
  )
}

export default Simulacion