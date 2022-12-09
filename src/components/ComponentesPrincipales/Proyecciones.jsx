import React from 'react'
import Menu from '../Sub-componentes/Menu';
import '../../estilos/Proyecciones.css';

import { useState } from 'react';
import GraficaLinea from '../Sub-componentes-estadisticas/GraficaLinea';
import GraficaLineaDoble from '../Sub-componentes-estadisticas/GraficaLineaDoble';

var variableProy   = "";
var cantiAniosProy = 0;
var intervaloProy  = 0;
var poblacionProy  = [];
var aniosProy      = [];

function setAnios(e){
  cantiAniosProy = e;
}
function setVariable(e){

  variableProy = e;
 }
function setIntervalo(e){
  intervaloProy = e;
 }
function Proyecciones() {

  const [grafica, setGrafica] = useState(<><GraficaLinea anio= {aniosProy} poblacion={poblacionProy} variable={variableProy}/></>);

function proyectarCrecimiento(){
const anio1=2001;
const anio2=2012;
const cantidad1=8274325;
const cantidad2=10059856;
const r=(1/(anio2-anio1))*Math.log(cantidad2/cantidad1);
var anio=[anio1,anio2];
var poblacion=[cantidad1,cantidad2];
for(var i=0;i<cantiAniosProy;i++){
  anio.push((anio[anio.length-1])+parseInt(intervaloProy));
  poblacion.push(Math.round(poblacion[1]*Math.exp(r*(anio[anio.length-1]-anio[1]))));
}
aniosProy = anio;
poblacionProy = poblacion;
  }

  function proyectarMortalidad(){
    const anio1=2001;
    const anio2=2012;
    const cantidad1=78676;
    const cantidad2=74261;
    const r=(1/(anio2-anio1))*Math.log(cantidad2/cantidad1);
    var anio=[anio1,anio2];
    var poblacion=[cantidad1,cantidad2];
    for(var i=0;i<cantiAniosProy;i++){
      anio.push((anio[anio.length-1])+parseInt(intervaloProy));
      poblacion.push(Math.round(poblacion[1]*Math.exp(r*(anio[anio.length-1]-anio[1]))));
    }
    aniosProy = anio;
    poblacionProy = poblacion;
      }
      function proyectarNatalidad(){
        const anio1=2001;
        const anio2=2012;
        const cantidad1=29.80;
        const cantidad2=24.10;
        const r=(1/(anio2-anio1))*Math.log(cantidad2/cantidad1);
        var anio=[anio1,anio2];
        var poblacion=[cantidad1,cantidad2];
        for(var i=0;i<cantiAniosProy;i++){
          anio.push((anio[anio.length-1])+parseInt(intervaloProy));
          poblacion.push(Math.round(poblacion[1]*Math.exp(r*(anio[anio.length-1]-anio[1]))));
        }
        aniosProy = anio;
        poblacionProy = poblacion;
          }

function actualizar(){
  if (variableProy === "Tasa de natalidad") {
      proyectarNatalidad();
      setGrafica(<GraficaLineaDoble anio= {aniosProy} poblacion={poblacionProy} variable1={variableProy} variable2={"Tasa de fecundidad"}
                   cantiAnios = {cantiAniosProy} intervalo = {intervaloProy}/>)
  }else{
     if (variableProy=== "Tasa de mortalidad") {
        proyectarMortalidad();
        setGrafica(<GraficaLinea anio= {aniosProy} poblacion={poblacionProy} variable={variableProy}/>)
     }else{
       if (variableProy==="Tasa de crecimiento poblacional") {
        proyectarCrecimiento();
        setGrafica(<GraficaLinea anio= {aniosProy} poblacion={poblacionProy} variable={variableProy}/>)
       }
     }
  }
}

return (
   <>
      <Menu/>
        <h1 className='titulo'>Proyecciones</h1>
     
      <div className="central">
      <h3>Variable:</h3>
          <select className='variable' onChange={(event)=>setVariable(event.target.value)} defaultValue={'DEFAULT'}>
          <option value={"DEFAULT"} disabled >Seleccione una variable a proyectar</option>
          <option value="Tasa de crecimiento poblacional">Crecimiento poblacional</option>
          <option value="Tasa de natalidad">Natalidad - Fecundidad</option>
          <option value="Tasa de mortalidad">Mortalidad</option>
        </select>
        <div className="anio">
        <h3> Años a proyectar: </h3>
        <input type="number" className='number' onChange={(event)=>setAnios(event.target.value)} />
         
        </div>
        
        
          <h3>Intervalo:</h3>
          <select className='intervalo' onChange={(event)=>setIntervalo(event.target.value)} defaultValue={'DEFAULT'}>
          <option value={"DEFAULT"} disabled >Seleccione intervalo</option>
          <option value="5" >5 años</option>
          <option value="10">10 años</option>
          <option value="15">15 años</option>
        </select>
        <button className='boton-calcular' onClick={actualizar} >Calcular</button>
      </div>
      <div className=''>
        
     


        <div className='contenedor-proyecciones'>
        {grafica}
        </div>
        </div>
    </>
  )
}

export default Proyecciones