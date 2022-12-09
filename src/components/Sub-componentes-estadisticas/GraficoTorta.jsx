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
function GraficoTorta() {

  const data = {
     labels: ['Cochabamba','La Paz','Santa Cruz','Oruro','Pando','Beni','Chuquisaca','Tarija','Potosi'],
     datasets:[
      {
        label:'Habitantes',
        backgroundColor: '#222222',
        borderColor: 'black',
        borderWidth:1,
        hoverBackgroundColor:'#222222',
        hoverBorderColor:'black',
        data:[10000,20000,30000,23455,11111,23333,20000,30000,47000]
      }
     ]
  }
  const opciones ={
    maintainAspectRatio:false,
    responsive:true
  }
  return (
    <div className='contenedor' >
      <h1>Habitantes de Bolivia</h1>
      <Bar data={data} options={opciones}/>
      
    </div>
  )
}

export default GraficoTorta