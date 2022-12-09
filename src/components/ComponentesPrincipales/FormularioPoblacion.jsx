
import React from 'react'
import { useEffect, useState} from 'react';
import {  NavLink} from 'react-router-dom';

import { getFirestore , getDocs , collection, query, addDoc, updateDoc ,doc} from 'firebase/firestore';


import Menu from '../Sub-componentes/Menu';
import '../../estilos/Formulario.css';
import PreguntaTexto from '../Sub-componentes/PreguntaTexto';
import PreguntaUnica from '../Sub-componentes/PreguntaUnica';
import PreguntaMultiple from '../Sub-componentes/PreguntaMultiple';
import PreguntaFecha from '../Sub-componentes/PreguntaFecha';
 
import '../../estilos/Pregunta.css'


const idDoc ="";
async function crearNuevaBoleta(){
    const db = getFirestore();
    var preguntaP01 = '';
    var preguntaP02 = '';
    var preguntaP03 = '';
    var preguntaP04 = '';
    var preguntaP05 = '';
    var preguntaP06 = '';
    var preguntaP07 = '';
    var preguntaP08 = '';
    var preguntaP09 = '';
    var preguntaP10 = '';
    var preguntaP11 = '';
    var preguntaP12 = '';
    var preguntaP13 = '';
    var preguntaP14 = '';
    var preguntaP15 = '';
    var preguntaP16 = '';
    var preguntaP17 = '';
    var preguntaP18 = '';
    var preguntaP19 = '';
    var preguntaP20 = '';
    var preguntaP21 = '';
    var preguntaP22 = '';
    var preguntaP23 = '';
    var preguntaP24 = '';
    var preguntaP25 = '';
    var preguntaP26 = '';
    var preguntaP27 = '';
    var preguntaP28 = '';
    var preguntaP29 = '';
    var preguntaP30 = '';
    var preguntaP31 = '';
    var preguntaP32 = '';
    var preguntaP33 = '';
    var preguntaP34 = '';
    var preguntaP35 = '';
    var preguntaP36 = '';
    var preguntaP37 = '';
        
    const docRef2 = await addDoc(collection(db, "boleta2000","registros","poblacion"), {
      preguntaP01,preguntaP02,preguntaP03,preguntaP04,preguntaP05,preguntaP06,preguntaP07,preguntaP08,preguntaP09,preguntaP10,
      preguntaP11,preguntaP12,preguntaP13,preguntaP14,preguntaP15,preguntaP16,preguntaP17,preguntaP18,preguntaP19,preguntaP20,
      preguntaP21,preguntaP22,preguntaP23,preguntaP24,preguntaP25,preguntaP26,preguntaP27,preguntaP28,preguntaP29,preguntaP30,
      preguntaP31,preguntaP32,preguntaP33,preguntaP34,preguntaP35,preguntaP36,preguntaP37
      });
  localStorage.setItem('boletaPoblacion', docRef2.id);
  
}

var arregloComponentes = [];

async function añadirIdVivienda(id) {
  const db = getFirestore();
  const vivienda = localStorage.getItem('boleta');
  const boleta = doc(db,"boleta2000","registros","poblacion",id);
  console.log("con id de vivienda");
  await updateDoc(boleta,{
    idVivienda: vivienda
 })
}
function FormularioPoblacion () {
   
  const [respuesta, setrespuesta] = useState("");
      function cambiarRespuesta(e){
        setrespuesta(e.target.value) 
      }
  
      sacarPreguntasBoleta();
  

    crearNuevaBoleta();
    añadirIdVivienda(localStorage.getItem('boletaPoblacion'));
      async function sacarPreguntasBoleta() {
        document.getElementsByClassName("contenedor-formulario").innerHTML='<div></div>';
  
            try {    
             const db = getFirestore();
             const q = query(collection(db, "boleta2000","preguntas","poblacion"));
             const querySnapshot = await getDocs(q);
             var enumerarPreguntas = 0;
     
             querySnapshot.forEach((doc) => {
              
               var pregunta = {
                 idPregu  : doc.data().idPregunta,
                 pregunta : doc.data().pregunta,
                 tipo     : doc.data().tipo,
                 opciones : doc.data().opciones,
                 idBoleta : localStorage.getItem('boletaPoblacion'),
                 textoPre : doc.data().texto
              } 
    
           if (pregunta.tipo === "multiple") {
          arregloComponentes.push(<PreguntaMultiple
          titulopregunta={pregunta.pregunta}
          opciones={pregunta.opciones}
          boleta = "boleta2000"
          registro = "poblacion"
          idPregunta   = {pregunta.idPregu}
          idDoc   = {localStorage.getItem('boletaPoblacion')}
          numero = {enumerarPreguntas +1}
          texto = {pregunta.textoPre}
          /> )
           }else{
             
             if(pregunta.tipo === "unica"){
     
              arregloComponentes.push(<PreguntaUnica
               titulopregunta={pregunta.pregunta}
               opciones={pregunta.opciones}
               boleta = "boleta2000"
               registro = "poblacion"
               idPregunta   = {pregunta.idPregu}
               idDoc   = {localStorage.getItem('boletaPoblacion')}
               texto   = {pregunta.texto}
               numero = {enumerarPreguntas+1}
               />)
             }else{
               if(pregunta.tipo === "texto"){
               arregloComponentes.push(<PreguntaTexto
               titulopregunta={pregunta.pregunta}
               opciones={pregunta.opciones}
               boleta = "boleta2000"
               registro = "poblacion"
               idPregunta   = {pregunta.idPregu}
               idDoc   = {localStorage.getItem('boletaPoblacion')}
               numero = {enumerarPreguntas +1}
               />)
     
               }else{
                if (pregunta.tipo==="fecha") {
                  arregloComponentes.push(<PreguntaFecha
                    titulopregunta={pregunta.pregunta}
                    opciones={pregunta.opciones}
                    boleta = "boleta2000"
                    registro = "poblacion"
                    idPregunta   = {pregunta.idPregu}
                    idDoc   = {localStorage.getItem('boletaPoblacion')}
                    numero = {enumerarPreguntas +1}
                    />)
                }
               }
             }
     
           } enumerarPreguntas++;
       });
            
     setrespuesta(arregloComponentes)
             } catch (err) {
                     console.log(err);
                 }    
      }
      sacarPreguntasBoleta();
  
  
  function recargar(){
    window.location.reload();
  }

  return (
      <div>
          <Menu/>
          <div className='titulo-form'><h1>Formulario Población Censo 2022</h1></div>
         <div className='contenedor-formulario' id='contenedor-formulario'>
      
          {arregloComponentes.map((opcion)=>(
                    <>{opcion}</>
                  ))}
    
          </div>
          <div className="contenedor-boton"> 
          <button className='boton-vivienda' > <NavLink to='/FormularioVivienda' >Terminar</NavLink ></button>
         <button className='boton-registrar' onClick={recargar} >Nueva boleta población </button>
          </div>
  
      </div>
    )
    
  }
  export default FormularioPoblacion