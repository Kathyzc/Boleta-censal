import React from 'react'
import { useState } from 'react';
import '../../estilos/Pregunta.css'
import { getFirestore , updateDoc, doc } from 'firebase/firestore';


var seleccionadas = [];
function PreguntaMultiple(props) {
    const [elegidos, setelegidos] = useState([]);
    function cambioOpciones(e){
      
        var seleccionado = e.target.value;
        var buscar = seleccionadas.indexOf(seleccionado);
        console.log(buscar);
        if(buscar === -1){
           seleccionadas.push(seleccionado);
             
        }else{
           seleccionadas.splice(buscar,1)
        }
       setelegidos(seleccionadas);
       console.log(seleccionadas);
       subirRespuestaABoleta();
    }

   async function subirRespuestaABoleta(){
  
    var localEst ="";
    if (props.registro === "poblacion") {
        localEst = localStorage.getItem('boletaPoblacion')
    }else{
        localEst = localStorage.getItem('boleta')
    }

      const db = getFirestore();
      const boleta = doc(db,props.boleta,"registros",props.registro,localEst);
   
      const dato = props.idPregunta;
      await updateDoc(boleta,{
        [dato]: seleccionadas
     })
  } 
   

  return (
    <div className='contenedor-pregunta'>
        <div className='titulo-pregunta'>{props.numero + ". " + props.titulopregunta}</div>

        <div >
          <ol>
              { 
                props.opciones.map((opcion)=>(
                  <><li><label className="container2">{opcion}
                  <input type="checkbox" key={opcion} value={opcion} onClick={cambioOpciones}/>
                  <span className="checkmark2"></span>
                </label></li></> 
                ))
              } 
           </ol>
            </div>
          <div className="texto">{props.texto}</div>                      
   </div>
  )
}

export default PreguntaMultiple