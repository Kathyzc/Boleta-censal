import React from 'react';
import '../../estilos/Sub-componentes-estadisticas/GraficoTorta.css'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
function GraficaBarras(props) {
  const labels1 = props.barras;
  //console.log(props.barras)
  const data = {
     labels: labels1,
     datasets:[
      {
        label:props.titulo,
        backgroundColor: 'rgba(54, 162, 235, 1)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth:1,
        hoverBackgroundColor: 'rgba(54, 162, 235, 1)',
        hoverBorderColor: 'rgba(54, 162, 235, 1)',
        data:props.cantidadbarras
      }
     ]
  }
  const opciones ={
    maintainAspectRatio:false,
    responsive:true,
    plugins: {
      legend: {
        position: 'top' ,
      },
      title: {
        display: true,
        text: 'Gráfica de frecuencias',
      },
    },
  }
  return (
    <div className='contenedor' >
      <h1>{props.titulo}</h1>
      <Bar data={data} options={opciones}/>
      
    </div>
  )
}

export default GraficaBarras