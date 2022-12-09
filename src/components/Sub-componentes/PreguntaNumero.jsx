import React from 'react'
import { useState } from 'react';
import { getFirestore , updateDoc, doc } from 'firebase/firestore';

import '../../estilos/Pregunta.css'
function PreguntaNumero(props) {
    var respuesta = "";
    function cambiarRespuesta(e){
      respuesta = e.target.value;
      subirRespuestaABoleta();
    }

    var localEst ="";
    if (props.registro === "poblacion") {
        localEst = localStorage.getItem('boletaPoblacion')
    }else{
        localEst = localStorage.getItem('boleta')
    }

    async function subirRespuestaABoleta(){
      const db = getFirestore();
      const boleta = doc(db,props.boleta,"registros",props.registro,localEst);
      
      const dato = props.idPregunta;
      await updateDoc(boleta,{
        [dato]: respuesta
     })
  } 

   
    
  return (
    <div className='contenedor-pregunta'>
        <div  className='titulo-pregunta'>{props.numero + ". " + props.titulopregunta}</div>
      
         <input type="number" placeholder='Solo valores numéricos' onKeyUp={cambiarRespuesta} />
    
    </div>
  )
}

export default PreguntaNumero