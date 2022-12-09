import React from 'react';
import '../../estilos/Sub-componentes-estadisticas/GraficoTorta.css'
import { Line } from "react-chartjs-2";
import {Chart, PointElement, registerables} from 'chart.js';

Chart.register(PointElement);
Chart.register(...registerables);

function GraficaLinea(props) {
const data = {
  labels: props.anio,
  datasets: [
    {
      label: props.variable,
      data: props.poblacion,
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)"
    }
  ]
};
var i = 0;
return (
  <div className="contenedor-proyecciones">
     <div className="cont-izquierda">
     <Line data={data} />
     </div>
     <div className='cont-derecha'>
     <table>
     <tr>
      <th>Año</th>
      <th>Población </th>
     </tr>
     {props.anio.map((anio)=>(
      <tr>
      <td>{anio}</td>
       <td>{props.poblacion[i++]}</td>  
        </tr>
     ))}
       
     </table>
    </div>
  </div>
);
}
export default GraficaLinea
