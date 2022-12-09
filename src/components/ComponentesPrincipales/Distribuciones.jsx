import React from "react";
import Menu from '../Sub-componentes/Menu';
import '../../estilos/Distribuciones.css';
import { getFirestore , getDocs , collection, query, addDoc, doc, updateDoc } from 'firebase/firestore';
import { useState} from 'react';
import GraficaLinea from "../Sub-componentes-estadisticas/GraficaLinea";
var variable = "";
  var muestra = 0;
  var probabilidad =0;
  var cantCorridas = 0;
  var ArrSumas=[];
  var ArrVariables=[];
  var variableBuscar="";

function Distribuciones() {

  const [tabla, setTabla] = useState(<></>);
  

  function setMuestra(e) {
    muestra = e;
  }
  function setVariable(e) {
    variable = e;
    if(variable==="Población con acceso a internet por edades"){
      variableBuscar="Grupos de edades";
      getProbabilidad("internet");
      
    }else{
      if(variable==="Población con acceso a alcantarillado"){
        variableBuscar="Tipos de vivienda";
        getProbabilidad("alcantarillado");
      }else{
        if(variable==="Población en el área rural"){
          variableBuscar="Grupos de edades";
          getProbabilidad("rural");
        }else{
          if(variable==="Población en el área urbana"){
            variableBuscar="Grupos de edades";
            getProbabilidad("urbano");
          }else{
          setTabla(<></>)
          }
        }
      }
    }
  }
  function setCorridas(e) {
    cantCorridas = e;
  }
  async function getProbabilidad(variable) {
    const db = getFirestore();
    const q = query(collection(db, "VariablesAleatorias"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
       if(doc.id==="Distribuciones"){
          probabilidad=doc.get(variable);
          document.getElementById('prob').value=probabilidad;
        }
    })
  }
  function setSumas(e) {
    ArrSumas = e;
  }
  function setArrVariables(e){
    ArrVariables = e;
  }
  
  async function generarTabla(){
    const db = getFirestore();
    const q = query(collection(db, "VariablesAleatorias"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
       if(doc.id===variableBuscar){
          if(variableBuscar==="Grupos de edades"){
            setArrVariables( doc.data().Edades);
          }else{
            console.log(doc.data().variables);
              setArrVariables( doc.data().variables);
          }
        }
    })
    
    console.log("sumas: "+ArrSumas);
    console.log("variables: "+ ArrVariables);
    console.log("cantCorridas: " + cantCorridas);
    console.log("muestra: "+ muestra);

    var i =0;
    setTabla(<>
    
     <GraficaLinea poblacion={ArrSumas} anio={ArrVariables} variable={variable}/>
    </>)
    
  }
  function generarDistribuciones() {
    console.log("Pressed");
    var probabilidades=[];
    
    if(variable==="Población con acceso a internet por edades"){
      probabilidades = [
        0.09863, 0.09798, 0.09758, 0.09549, 0.09095, 0.08399, 0.07544, 0.06704,
        0.0587, 0.05044, 0.0426, 0.03562, 0.02962, 0.02443, 0.01975, 0.01458, 0.01717
      ];
    }else{
      if(variable==="Población con acceso a alcantarillado"){
        probabilidades=[0.136,0.165,0.062,0.637];
      }
    }
    var cantPoblacion = [];

    for (var j = 0; j < probabilidades.length; j++) {
      cantPoblacion.push(Math.round(probabilidades[j] * muestra));
    };
    var matriz = [];
    var corridas = [];
    var cantCorridas2 = cantCorridas;
    function binomial(n, p, uniforme) {
      var i = 0;
      var c = p / (1 - p);
      var pr = Math.pow((1 - p), n);
      var f = pr;
      while (uniforme >= f) {
        pr = ((c * (n - i)) / (i + 1)) * pr;
        f = f + pr;
        i = i + 1;
      }
      var x = i;
      return x;
    }
    while (cantCorridas2 > 0) {
      for (var g = 0; g < cantPoblacion.length; g++) {
        matriz.push(binomial(cantPoblacion[g], probabilidad, Math.random()));
      }
      cantCorridas2--;
      corridas.push(matriz);
      matriz = [];
    }
    var m = 0;
    var suma = 0;
    var sumas = [];
    var arreglo;
    while (m < cantPoblacion.length) {
      for (var k = 0; k < corridas.length; k++) {
        arreglo = corridas[k];
        suma = parseInt(arreglo[m]) + suma;
      }
      sumas.push(suma);
      suma = 0;
      m = m + 1;
    }
    setSumas(sumas);
    generarTabla();
  }

  return (
    <>  <Menu />
      <h1 className='titulo'>Distribucion Binomial</h1>
     
      <div className="contenedor-central">
        <h3>Simular variable:</h3>
        <select className='variable' onChange={(event) => setVariable(event.target.value)} defaultValue={'DEFAULT'}>
          <option value={"DEFAULT"} disabled >Seleccione una variable a proyectar</option>
          <option value="Población con acceso a internet por edades">Población con acceso a internet por edades</option>
          <option value="Población con acceso a alcantarillado">Población con acceso a alcantarillado</option>
          <option value="Población en el área rural">Población en el área rural</option>
          <option value="Población en el área urbana">Población en el área urbana</option>
        </select>
        <div className="muestra">
          <h3> Población/Muestra: </h3>
          <input type="number" className='number' onChange={(event) => setMuestra(event.target.value)} />

        </div>
        <div className="corridas">
          <h3> Nro de corridas: </h3>
          <input type="number" className='number' onChange={(event) => setCorridas(event.target.value)} />

        </div>
        <div className="probabilidad">
          <h3> Probabilidad: </h3>
          <input type="number" className='number' id="prob" readOnly />

        </div>

      </div>

      <div className="contenedor-boton">
        <button className="boton-generar" onClick={generarDistribuciones}>Generar</button>
      </div>

         <div className="tabla-distribuciones">
          {tabla}
         </div>
    </>
  );
}
export default Distribuciones;