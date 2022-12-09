import { useEffect} from 'react';
import '../estilos/historialAdministrador.css';
import Menu from './Sub-componentes/Menu';
import { getFirestore , getDocs , collection, query } from 'firebase/firestore';


var BoletasPasadas  = [];

export default function TablaHistorial(){
    function valores(Boletas){
        BoletasPasadas = Boletas;
        let cols = 1;
         const tBody = document.getElementById('columnaFecha');

         BoletasPasadas.forEach((row) => {
          let i = 0;
          const itemsToRender = BoletasPasadas.slice(i, cols);
          const newRow = tBody.insertRow();
  
          itemsToRender.forEach((col, index) => {
          const celdaAccion  = newRow.insertCell(index);
          const celdaFecha   = newRow.insertCell(index);
          const celdaColumna = newRow.insertCell(index);
          
          const accionDoc =  document.createTextNode('Ver...');   
          const fechaDoc =  document.createTextNode(row.fecha);   
          const nombreDoc =  document.createTextNode(row.nombre);
          
          celdaColumna.appendChild(nombreDoc);
          celdaFecha.appendChild(fechaDoc);
          celdaAccion.appendChild(accionDoc); 
          
          });
          });
    }
    useEffect( () => { 
        async function fetchData() {
            try {
          
            var arregloDeBoletas  = [];         
            const db = getFirestore();
            const q = query(collection(db, "HistorialBoletasCensales"));
            const querySnapshot = await getDocs(q);


            querySnapshot.forEach((doc) => {
                const boleta = {
                    
                    fecha: doc.data().FechaDeCreacion,
                    nombre: doc.data().NombreDocumento,
                    accion: 'Ver'
                }

                arregloDeBoletas.push(boleta)

             });
            
            valores(arregloDeBoletas);
            } catch (err) {
                    console.log(err);
                }
}
fetchData();
    },[])


    return (
        <div>

            <Menu/>
            <div className='titulo-hist'><h1>Historial de boletas censales</h1></div>
     <div className='contenedor-tabla'>
     <table>
       <thead>
        <tr>
            <th>Fecha de creación</th>
            <th>Nombre de la boleta</th>
            <th>Acción</th>
        </tr>
        </thead>
        <tbody id='columnaFecha'>
        </tbody>
    </table>
    </div>
        </div>
    )
     
}