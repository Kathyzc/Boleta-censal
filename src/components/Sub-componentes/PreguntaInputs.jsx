import React from 'react'
import { useState } from 'react';
import '../../estilos/Pregunta.css'
import { getFirestore , updateDoc, doc } from 'firebase/firestore';

var arrayIds= [];
function PreguntaInputs(props) {
   
    var [respuesta, setrespuesta] = useState([]);
    var [opcion, setopcion] = useState([]);

   arrayIds =  [generateUUID(),generateUUID(),generateUUID(),generateUUID(),generateUUID()];
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
        
        console.log("a subir: " + opcion + respuesta );
        await updateDoc(boleta,{
          [dato]: {opcion,respuesta}
       })
    } 
function cambiarRespuesta1(e){
   opcion[0] = e.target.value;
   console.log(opcion);
   setopcion(opcion);
   subirRespuestaABoleta()
}

function cambiarRespuesta2(e){
    opcion[1] = e.target.value;
   console.log(opcion);
   setopcion(opcion);
   subirRespuestaABoleta()
}

function cambiarRespuesta3(e){
    opcion[2] = e.target.value;
   console.log(opcion);
   setopcion(opcion);
   subirRespuestaABoleta()
}

function cambiarRespuesta4(e){
    opcion[3] = e.target.value;
   console.log(opcion);
   setopcion(opcion);
   subirRespuestaABoleta()
}

function cambiarRespuesta5(e){
    opcion[4] = e.target.value;
   console.log(opcion);
   setopcion(opcion);
   subirRespuestaABoleta()
}

function cambiarRespuesta11(e){
    respuesta[0] = e.target.value;
    console.log(respuesta);
    setrespuesta(respuesta);
    subirRespuestaABoleta()
 }
 
 function cambiarRespuesta22(e){
     respuesta[1] = e.target.value;
     console.log(respuesta);
     setrespuesta(respuesta);
     subirRespuestaABoleta()
 }
 
 function cambiarRespuesta33(e){
     respuesta[2] = e.target.value;
     console.log(respuesta);
     setrespuesta(respuesta);
     subirRespuestaABoleta()
 }
 
 function cambiarRespuesta44(e){
     respuesta[3] = e.target.value;
     console.log(respuesta);
     setrespuesta(respuesta);
     subirRespuestaABoleta()
 }
 
 function cambiarRespuesta55(e){
     respuesta[4] = e.target.value;
     console.log(respuesta);
     setrespuesta(respuesta);
     subirRespuestaABoleta()
 }
  return (
    <div className='contenedor-pregunta'>
        <div className='titulo-pregunta'>{props.numero + ". " + props.titulopregunta}</div>

        <div >
            <table id='tabla'>
            <tr>
                <th style={{width:"10%"}}><strong>Nro</strong></th>
                <th><strong>Nombre</strong></th>
                <th><strong>Relación con la persona de referencia del hogar</strong></th>
              </tr>
            
              <tr>
                <td style={{width:"10%"}}>1</td>
                <td><input type="text" id={arrayIds[0]} onKeyUp={cambiarRespuesta1}/></td>
                <td>
                    <select name="select" onChange={cambiarRespuesta11}>
                       <option value="Jefa, jefe o persona de referencia" selected>Jefa, jefe o persona de referencia</option>
                       <option value="Esposo/a, conviviente o concubino/a">Esposo/a, conviviente o concubino/a</option>
                       <option value="Hija o hijo">Hija o hijo</option>
                       <option value="Nuera o yerno">Nuera o yerno</option>
                       <option value="Nieta o nieto">Nieta o nieto</option>
                       <option value="Hermana/o o cuñada/o">Hermana/o o cuñada/o</option>
                       <option value="Padre, madre, suegra/o">Padre, madre, suegra/o</option>
                       <option value="Otro pariente">Otro pariente</option>
                       <option value="Trabajador/a del hogar">Trabajador/a del hogar</option>
                       <option value="Otro no pariente">Otro no pariente</option>
                       <option value="Persona en vivienda colectiva">Persona en vivienda colectivao</option>
                    </select>
                </td>
              </tr>
              <tr>
                <td style={{width:"10%"}}>2</td>
                <td><input  id={arrayIds[1]} type="text" onKeyUp={cambiarRespuesta2}/></td>
                <td>
                    <select name="select" onChange={cambiarRespuesta22}>
                       <option value="Jefa, jefe o persona de referencia" selected>Jefa, jefe o persona de referencia</option>
                       <option value="Esposo/a, conviviente o concubino/a">Esposo/a, conviviente o concubino/a</option>
                       <option value="Hija o hijo">Hija o hijo</option>
                       <option value="Nuera o yerno">Nuera o yerno</option>
                       <option value="Nieta o nieto">Nieta o nieto</option>
                       <option value="Hermana/o o cuñada/o">Hermana/o o cuñada/o</option>
                       <option value="Padre, madre, suegra/o">Padre, madre, suegra/o</option>
                       <option value="Otro pariente">Otro pariente</option>
                       <option value="Trabajador/a del hogar">Trabajador/a del hogar</option>
                       <option value="Otro no pariente">Otro no pariente</option>
                       <option value="Persona en vivienda colectiva">Persona en vivienda colectivao</option>
                    </select>
                </td>
              </tr>
              <tr>
                <td style={{width:"10%"}}>3</td>
                <td><input type="text" id={arrayIds[2]} onKeyUp={cambiarRespuesta3}/></td>
                <td>
                    <select name="select" onChange={cambiarRespuesta33}>
                       <option value="Jefa, jefe o persona de referencia" selected>Jefa, jefe o persona de referencia</option>
                       <option value="Esposo/a, conviviente o concubino/a">Esposo/a, conviviente o concubino/a</option>
                       <option value="Hija o hijo">Hija o hijo</option>
                       <option value="Nuera o yerno">Nuera o yerno</option>
                       <option value="Nieta o nieto">Nieta o nieto</option>
                       <option value="Hermana/o o cuñada/o">Hermana/o o cuñada/o</option>
                       <option value="Padre, madre, suegra/o">Padre, madre, suegra/o</option>
                       <option value="Otro pariente">Otro pariente</option>
                       <option value="Trabajador/a del hogar">Trabajador/a del hogar</option>
                       <option value="Otro no pariente">Otro no pariente</option>
                       <option value="Persona en vivienda colectiva">Persona en vivienda colectivao</option>
                    </select>
                </td>
              </tr>
              <tr>
                <td style={{width:"10%"}}>4</td>
                <td><input type="text"  id={arrayIds[3]} onKeyUp={cambiarRespuesta4}/></td>
                <td>
                    <select name="select" onChange={cambiarRespuesta44}>
                       <option value="Jefa, jefe o persona de referencia" selected>Jefa, jefe o persona de referencia</option>
                       <option value="Esposo/a, conviviente o concubino/a">Esposo/a, conviviente o concubino/a</option>
                       <option value="Hija o hijo">Hija o hijo</option>
                       <option value="Nuera o yerno">Nuera o yerno</option>
                       <option value="Nieta o nieto">Nieta o nieto</option>
                       <option value="Hermana/o o cuñada/o">Hermana/o o cuñada/o</option>
                       <option value="Padre, madre, suegra/o">Padre, madre, suegra/o</option>
                       <option value="Otro pariente">Otro pariente</option>
                       <option value="Trabajador/a del hogar">Trabajador/a del hogar</option>
                       <option value="Otro no pariente">Otro no pariente</option>
                       <option value="Persona en vivienda colectiva">Persona en vivienda colectivao</option>
                    </select>
                </td>
              </tr>
              <tr>
                <td style={{width:"10%"}}>5</td>
                <td><input type="text"  id={arrayIds[4]} onKeyUp={cambiarRespuesta5}/></td>
                <td>
                    <select name="select" onChange={cambiarRespuesta55}>
                       <option value="Jefa, jefe o persona de referencia" selected>Jefa, jefe o persona de referencia</option>
                       <option value="Esposo/a, conviviente o concubino/a">Esposo/a, conviviente o concubino/a</option>
                       <option value="Hija o hijo">Hija o hijo</option>
                       <option value="Nuera o yerno">Nuera o yerno</option>
                       <option value="Nieta o nieto">Nieta o nieto</option>
                       <option value="Hermana/o o cuñada/o">Hermana/o o cuñada/o</option>
                       <option value="Padre, madre, suegra/o">Padre, madre, suegra/o</option>
                       <option value="Otro pariente">Otro pariente</option>
                       <option value="Trabajador/a del hogar">Trabajador/a del hogar</option>
                       <option value="Otro no pariente">Otro no pariente</option>
                       <option value="Persona en vivienda colectiva">Persona en vivienda colectivao</option>
                    </select>
                </td>
              </tr>
            </table>

        </div>                   
   </div>
  )
}

export default PreguntaInputs


function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}
