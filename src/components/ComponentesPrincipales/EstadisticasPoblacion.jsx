import { collection, doc, getCountFromServer, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import React from 'react'
import { useState } from 'react';
import Menu from '../Sub-componentes/Menu';
import GraficaBarras from '../Sub-componentes-estadisticas/GraficaBarras';
import GraficaDona from '../Sub-componentes-estadisticas/GraficaDona';
import '../../estilos/Estadisticas.css';
function EstadisticasPoblacion() {
  const [variable,setVariable]=useState("02");
  const [departamento, setDepartamento]=useState("");
  const arrayColores = [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(100, 192, 192, 1)',
        'rgba(153, 255, 255, 1)',
        'rgba(255, 255, 64, 1)',
      ]
      const db = getFirestore();
      //var cantidades = [];
      var [cantidades,setCantidades]=useState([]);
      //var porcentajes = [];
      var [porcentajes,setPorcentajes]=useState([]);
      //var opciones = [];
      var [opciones,setOpciones]=useState([]);
      var q, snapshot, cantidad, porcentaje,pregunta,docRef,docSnap,cant;
      var total =0;
      const preg = 'preguntaP';
      var [titulo,setTitulo]=useState('');
  async function analisis(){
    console.log(variable);
    console.log(departamento);
    cantidades=[];
    opciones=[];
    porcentajes=[];
    //setCantidades([]);
    //setPorcentajes([]);
    //setOpciones([]);
    pregunta = preg+variable;
    docRef = doc(db,"boleta2000","preguntas","poblacion",variable);
    docSnap = await getDoc(docRef);
    console.log('opciones:',docSnap.data().opciones);
    opciones=docSnap.data().opciones;
    setTitulo(docSnap.data().pregunta);
    console.log(titulo);

    if(variable!=="04"){
      if(departamento===""){
        for(var i=0;i<opciones.length;i++){
          q = query(collection(db, "boleta2000","registros","poblacion"),where(pregunta,'==',opciones[i]));
          snapshot = await getCountFromServer(q);
          cantidad = snapshot.data().count
          total = total + cantidad;
          cantidades.push(cantidad);
          console.log(cantidades[i]);
        }
  
      }else{
        for(i=0;i<opciones.length;i++){
          q = query(collection(db, "boleta2000","registros","poblacion"),where(pregunta,'==',opciones[i]),where('departamento','==',departamento));
          snapshot = await getCountFromServer(q);
          cantidad = snapshot.data().count
          total = total + cantidad;
          cantidades.push(cantidad);
          console.log(cantidades[i]);
        }
      }
    }else{
      cantidades[0] = 0;
      if(departamento===""){
        q = query(collection(db, "boleta2000","registros","poblacion"),where('preguntaP02','==','Mujer / Femenino'));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc)=>{
          cant = doc.data().preguntaP04;
          console.log(cant);
          if(cant>=15&&cant<=49){
            cantidades[0] = cantidades[0]+1;
          }
        })
        total = cantidades[0];
      }else{
        q = query(collection(db, "boleta2000","registros","poblacion"),where('preguntaP02','==','Mujer / Femenino'),where('departamento','==',departamento));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc)=>{
          cant = doc.data().preguntaP04;
          if(cant>=15&&cant<=49){
            cantidades[0] = cantidades[0]+1;
          }
        })
        total = cantidades[0];
      }
      opciones=['Mujeres entre 15 y 49 años'];
    }
    
    console.log('porcentajes');
    for(var j=0;j<cantidades.length;j++){
      porcentaje = (cantidades[j]/total)*100;
      porcentajes.push(porcentaje);
      console.log(porcentajes[j]);
    }

    setCantidades(cantidades);
    setPorcentajes(porcentajes);
    setOpciones(opciones);
    console.log("cantidadesssss:",cantidades)
    console.log("porcentajeeeees:",porcentajes);
  }
//<option value="35">Cuántas hijas e hijos nacidos vivos ha tenido</option>
//<option value="36">De hijas e hijos nacidos vivos, cuántos viven actualmente</option>
  return (
   
    <div className='contenedor-e'>
        <Menu/>
        <h1 className='titulo'>Estadisticas de Población</h1>
       
      <div className='contenedor-estadisticas'>
       <select className='input' value={variable} onChange={(event)=>setVariable(event.target.value)}>
          <option value="02">Es mujer o hombre</option>
          <option value="19">Cobertura de salud</option>
          <option value="14">Departamento donde nacio</option>
          <option value="18">Departamento donde vivió hace 5 años</option>
          <option value="06">Asiste a una escuela o colegio</option>
          <option value="10">Nivel más alto de instruccion que aprobó</option>
          <option value="15">País donde nació</option>
          <option value="04">Mujeres en edad fertil</option>
        </select>
       
      </div>
       
      <div className='contenedor'>
        <GraficaBarras
          titulo= {titulo}
          barras = {opciones}
          cantidadbarras={cantidades}
          color='rgba(53, 162, 235, 0.5)'
          />
          
          <GraficaDona
          titulo= {titulo}
          labels = {opciones}
          datos ={porcentajes}
          colores={arrayColores}
          border={arrayColores}
          />
        </div>
    </div>
  )
}

export default EstadisticasPoblacion