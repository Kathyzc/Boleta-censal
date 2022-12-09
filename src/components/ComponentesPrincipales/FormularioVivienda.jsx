
import React from 'react'
import { useEffect, useState} from 'react';
import {  NavLink} from 'react-router-dom';
import { getFirestore , getDocs , collection, query, addDoc, doc, updateDoc } from 'firebase/firestore';

import Menu from '../Sub-componentes/Menu';
import '../../estilos/Formulario.css';
import PreguntaTexto from '../Sub-componentes/PreguntaTexto';
import PreguntaUnica from '../Sub-componentes/PreguntaUnica';
import PreguntaMultiple from '../Sub-componentes/PreguntaMultiple';
import PreguntaFecha from '../Sub-componentes/PreguntaFecha';
 
import '../../estilos/Pregunta.css'
import PreguntaInputs from '../Sub-componentes/PreguntaInputs';
import PreguntaNumero from '../Sub-componentes/PreguntaNumero';

const idDoc ="";
async function crearNuevaBoleta(){
  const db = getFirestore();
  var provincia = '';
  var departamento='';
  var localidad='';
  var fraccion='';
  var radio ='';
  var segmento='';
  var manzanaNum='';
  var ladoManzana='';
  var codigoCalle='';
  var calle='';
  var numPuerta='';
  var pisoNum='';
  var departamentoPieza ='';
  var edificio='';
  var entrada='';
  var casaLote='';
  var vivienda='';
  var pregunta01 = '';
  var pregunta02 = '';
  var pregunta03 = '';
  var pregunta04 = '';
  var pregunta05 = '';
  var pregunta06 = '';
  var pregunta07 = '';
  var pregunta08 = [];
  var pregunta09 = [];
  var pregunta10 = '';
  var pregunta11 = '';
  var pregunta12 = '';
  var pregunta13 = '';
  var pregunta14 = '';
  var pregunta15 = '';
  var pregunta16 = '';
  var pregunta17 = '';
  var pregunta18 = '';
  var pregunta19 = '';
  var pregunta20 = '';
  var pregunta21 = '';
  var pregunta22 = '';
  var pregunta23 = '';
  var pregunta24 = [];
      
  const docRef1 = await addDoc(collection(db, "boleta2000","registros","viviendas"), {
    provincia,departamento,localidad,fraccion,radio,segmento,manzanaNum,ladoManzana,codigoCalle,
    calle,numPuerta,pisoNum,departamentoPieza,edificio,entrada,casaLote,vivienda,
    pregunta01, pregunta02,pregunta03,pregunta04,pregunta05, pregunta06,pregunta07,pregunta08,pregunta09,pregunta10,
    pregunta11, pregunta12,pregunta13,pregunta14,pregunta15, pregunta16,pregunta17,pregunta18,pregunta19,pregunta20,
    pregunta21, pregunta22,pregunta23,pregunta24
    });
  localStorage.setItem('boleta', docRef1.id);
  console.log("Boleta creada " + docRef1.id );
  añadirId(docRef1.id);
}

async function añadirId(id) {
  const db = getFirestore();
  const boleta = doc(db,"boleta2000","registros","viviendas",id);
  console.log("con id check");
  await updateDoc(boleta,{
    idVivienda: id
 })
}
var arregloComponentes = [];


function FormularioVivienda () {
 
 
const [respuesta, setrespuesta] = useState("");
    function cambiarRespuesta(e){
      setrespuesta(e.target.value) 
    }

  sacarPreguntasBoleta();

  crearNuevaBoleta();
    async function sacarPreguntasBoleta() {
      document.getElementsByClassName("contenedor-formulario").innerHTML='<div></div>';
  
          try {    
           const db = getFirestore();
           const q = query(collection(db, "boleta2000","preguntas","vivienda"));
           const querySnapshot = await getDocs(q);
   
           var enumerarPreguntas = 0;
           querySnapshot.forEach((doc) => {
            
             var pregunta = {
               idPregu  : doc.data().idPregunta,
               pregunta : doc.data().pregunta,
               tipo     : doc.data().tipo,
               opciones : doc.data().opciones,
               idBoleta : idDoc,
               textoPre : doc.data().texto
            } 
  
         if (pregunta.tipo === "multiple") {
        arregloComponentes.push(<PreguntaMultiple
        titulopregunta={pregunta.pregunta}
        opciones={pregunta.opciones}
        boleta = "boleta2000"
        registro = "viviendas"
        idPregunta   = {pregunta.idPregu}
        idDoc   = {localStorage.getItem('boleta')}
        numero = {enumerarPreguntas +1}
        texto = {pregunta.textoPre}
        /> )
         }else{
           
           if(pregunta.tipo === "unica"){
   
            arregloComponentes.push(<PreguntaUnica
             titulopregunta={pregunta.pregunta}
             opciones={pregunta.opciones}
             boleta = "boleta2000"
             registro = "viviendas"
             idPregunta   = {pregunta.idPregu}
             idDoc   = {localStorage.getItem('boleta')}
             texto   = {pregunta.textoPre}
             numero = {enumerarPreguntas +1}
             />)
           }else{
             if(pregunta.tipo === "texto"){
             arregloComponentes.push(<PreguntaTexto
             titulopregunta={pregunta.pregunta}
             opciones={pregunta.opciones}
             boleta = "boleta2000"
             registro = "viviendas"
             idPregunta   = {pregunta.idPregu}
             idDoc   = {localStorage.getItem('boleta')}
             numero = {enumerarPreguntas +1}
             
             />)
   
             }else{
              if (pregunta.tipo==="fecha") {
                arregloComponentes.push(<PreguntaFecha
                  titulopregunta={pregunta.pregunta}
                  opciones={pregunta.opciones}
                  boleta = "boleta2000"
                  registro = "viviendas"
                  idPregunta   = {pregunta.idPregu}
                  idDoc   = {localStorage.getItem('boleta')}
                  numero = {enumerarPreguntas +1}
                  />)
              }else{
                if (pregunta.tipo==="numero") {
                  arregloComponentes.push(<PreguntaNumero
                    titulopregunta={pregunta.pregunta}
                    boleta = "boleta2000"
                    registro = "viviendas"
                    idPregunta   = {pregunta.idPregu}
                    idDoc   = {localStorage.getItem('boleta')}
                    numero = {enumerarPreguntas +1}
                    />)
                  
                  }else{
                    if (pregunta.tipo==="inputs") {
                      arregloComponentes.push(<PreguntaInputs
                        titulopregunta={pregunta.pregunta}
                        boleta = "boleta2000"
                        registro = "viviendas"
                        idPregunta   = {pregunta.idPregu}
                        idDoc   = {localStorage.getItem('boleta')}
                        numero = {enumerarPreguntas +1}
                        />)
                      
                      }
                  }
              }
             }
           }
   
         }
         enumerarPreguntas++;
     });
          
   setrespuesta(arregloComponentes)
           } catch (err) {
                   console.log(err);
               }    
    }
 ;

return (
    <div>
        <Menu/>
        <div className='titulo-form'><h1>Formulario Vivienda Censo 2022</h1></div>
        <div className='contenedor-formulario' id='contenedor-formulario'>
    
        {arregloComponentes.map((opcion)=>(
                  <>{opcion}</>
                ))}
 
        </div>
        <div className="contenedor-boton">
        <button className='boton-registrar'> <NavLink to='/FormularioPoblacion'>Crear boleta población</NavLink ></button>
        </div>

    </div>
  )
  
}
export default FormularioVivienda