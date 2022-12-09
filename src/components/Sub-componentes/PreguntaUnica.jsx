import React from 'react'
import { getFirestore , updateDoc, doc } from 'firebase/firestore';
import '../../estilos/Pregunta.css'
function PreguntaUnica(props) {
    var elegido = "";
   async function cambioOpcionUnica(e){
      elegido = e.target.value;
      subirRespuestaABoleta();
    }

    async function subirRespuestaABoleta(){
      
      const db = getFirestore();

      var localEst ="";
        if (props.registro === "poblacion") {
            localEst = localStorage.getItem('boletaPoblacion')
        }else{
            localEst = localStorage.getItem('boleta')
        }

      const boleta = doc(db,props.boleta,"registros",props.registro,localEst);
     console.log(elegido);
      const dato = props.idPregunta;
      await updateDoc(boleta,{
        [dato]: elegido
     })
  } 
  return (
    <div className='contenedor-pregunta'>
        <div className='titulo-pregunta'>{props.numero + ". " + props.titulopregunta}</div>
          
            <div >
              <ol>
              {
                props.opciones.map((opcion)=>(
                  <><li>
                  <label className="container">{opcion}
                  <input type="radio" key={opcion} value={opcion}  name={props.idPregunta} onClick={cambioOpcionUnica} required/>
                  <span className="checkmark"></span>
                  </label></li></>
                ))
              }
              </ol>
            </div>
        <div className="texto">{props.texto}</div>
                 
    </div>
  )
}

export default PreguntaUnica