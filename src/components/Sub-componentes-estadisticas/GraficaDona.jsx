import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import '../../estilos/Sub-componentes-estadisticas/GraficoTorta.css'
ChartJS.register(ArcElement, Tooltip, Legend);

function GraficaDona(props) {
    const data = {
        labels: props.labels,
        datasets:[
            {
                label:props.medida,
                data:props.datos,
                backgroundColor: props.colores,
                borderColor:props.border,
                borderWidth:1,
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
              text: 'Gráfica de porcentajes',
            },
          },
      }
  return (
    <div className='contenedor'>
        <h1>{props.titulo}</h1>
        <Doughnut data={data} options={opciones}/>
    </div>
  )
}

export default GraficaDona