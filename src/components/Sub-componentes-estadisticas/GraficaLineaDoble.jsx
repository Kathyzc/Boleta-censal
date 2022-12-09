import React from 'react';
import '../../estilos/Sub-componentes-estadisticas/GraficoTorta.css'
import { Line } from "react-chartjs-2";
import {Chart, PointElement, registerables} from 'chart.js';

Chart.register(PointElement);
Chart.register(...registerables);

var aniosP = [];
var poblacionP = [];
function GraficaLineaDoble(props) {
   proyectarNatalidad()
    function proyectarNatalidad(){
        const anio1=2001;
        const anio2=2012;
        const cantidad1=3.97;
        const cantidad2=3.01;
        const r=(1/(anio2-anio1))*Math.log(cantidad2/cantidad1);
        var anio=[anio1,anio2];
        var poblacion=[cantidad1,cantidad2];
        for(var i=0;i<props.cantiAnios;i++){
          anio.push((anio[anio.length-1])+parseInt(props.intervalo));
          poblacion.push(Math.round(poblacion[1]*Math.exp(r*(anio[anio.length-1]-anio[1]))));
        }
        aniosP = anio;
        poblacionP = poblacion;
          }

const data = {
  labels: props.anio,
  datasets: [
    {
      label: props.variable1,
      data: props.poblacion,
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)"
    },
    {
        label: props.variable2,
        data: poblacionP,
        fill: true,
        backgroundColor: "rgba(231, 184, 237)",
      borderColor: "rgba(90, 27, 99)"
      },
  ]
};
var iN = 0;
var iF = 0;
console.log("poblacionA:" + poblacionP+ "poblacionB: "+props.poblacion +", anios: "+aniosP);
return (
  <>
   <div className="contenedor-proyecciones">
     <div className="cont-izquierda">
     <Line data={data} />
     </div>
     <div className='cont-derecha'>
     <table>
     <tr>
      <th>Año</th>
      <th>% Natalidad</th>
      <th>% Fecundidad</th>
     </tr>
     {aniosP.map((anio)=>(
      <tr>
      <td>{anio}</td>
       <td>{props.poblacion[iN++]}%</td>  
       <td>{poblacionP[iF++]}%</td> 
        </tr>
     ))}
       
     </table>
    </div>
  </div>
  </>
);
}
export default GraficaLineaDoble
