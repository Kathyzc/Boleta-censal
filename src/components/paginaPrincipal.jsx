import React from 'react';
import Menu from './Sub-componentes/Menu';
import '../estilos/paginaPrincipal.css';
import imagenCenso from '../imagenes/Bolivia-Censo.jpg';
function paginaPrincipal() {
  return (
    <div>
        <Menu/>
        <div className='titulo-principal'>
            <h1>Bienvenido a la aplicación de censos!</h1>
        </div>
        <div id="contenedor">
          <div className="izquierda">
            <img className='img-censo' src={imagenCenso}/>
          </div>
          <div className="derecha">
         El censo de población y vivienda brinda los elementos de juicio para que el Estado asigne y distribuya los fondos públicos entre los distintos grupos y regiones del país, con el fin de que el gobierno priorice los programas de inversión pública en educación, salud, saneamiento básico, vivienda, infraestructura y asentamientos humanos;La tarea de obtener información acerca de la población es responsabilidad del INE Instituto Nacional de Estadística; esta debe elaborar la boleta censal a través de la cual se recolecta diversa información sobre el número de habitantes del país, la edad, el lugar de residencia, el nivel de instrucción, el o los idiomas que habla la población

          </div>
        </div>
    </div>
  )
}

export default paginaPrincipal