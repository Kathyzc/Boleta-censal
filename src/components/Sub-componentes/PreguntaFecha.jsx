import React from 'react'
import { useState } from 'react';
import '../../estilos/Pregunta.css'
import { getFirestore , updateDoc, doc } from 'firebase/firestore';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function PreguntaFecha(props) {

    const [value, onChange] = useState(new Date());

    subirRespuestaABoleta();

    async function subirRespuestaABoleta(){
        var dia = value.getDate();
        var mes = value.getMonth() + 1;
        var año = value.getFullYear();

        var fecha = dia + "/" + mes + "/" + año;
         
        var localEst ="";
        if (props.registro === "poblacion") {
            localEst = localStorage.getItem('boletaPoblacion')
        }else{
            localStorage.getItem('boleta')
        }

        const db = getFirestore();
        const boleta = doc(db,props.boleta,"registros",props.registro,localEst);
     
        const dato = props.idPregunta;
        await updateDoc(boleta,{
          [dato]: fecha
       })
    } 

    return (
    <><div className='contenedor-pregunta'>
        <div className='titulo-pregunta'>{props.numero + ". " + props.titulopregunta}</div>
   
    <div className='contenedor-calendario'>
        <Calendar onChange={onChange} value={value} />
     </div>
     </div></>
   
    );

}
export default PreguntaFecha