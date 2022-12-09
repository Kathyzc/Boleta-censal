import { collection, doc, getCountFromServer, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import React from 'react'
import { useState } from 'react';
import Menu from '../Sub-componentes/Menu';
import GraficaBarras from '../Sub-componentes-estadisticas/GraficaBarras';
import GraficaDona from '../Sub-componentes-estadisticas/GraficaDona';
import '../../estilos/Estadisticas.css';
function EstadisticasVivienda() {
  const [variable,setVariable]=useState("01");
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
      var q, snapshot, cantidad, porcentaje,pregunta,docRef,docSnap,tam;
      var total =0;
      const preg = 'pregunta';
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
    console.log("se vacia cantidades?:",cantidades);
    console.log("se vacia porcentajes?:",porcentajes);
    console.log("se vacia opciones?:",opciones);
    pregunta = preg+variable;
    docRef = doc(db,"boleta2000","preguntas","vivienda",variable);
    docSnap = await getDoc(docRef);
    console.log('opciones:',docSnap.data().opciones);
    opciones=docSnap.data().opciones;
    setTitulo(docSnap.data().pregunta);
    console.log(titulo);

    if(variable!=="09"){
      if(departamento===""){
        for(var i=0;i<opciones.length;i++){
          q = query(collection(db, "boleta2000","registros","viviendas"),where(pregunta,'==',opciones[i]));
          snapshot = await getCountFromServer(q);
          cantidad = snapshot.data().count
          total = total + cantidad;
          cantidades.push(cantidad);
          console.log(cantidades[i]);
        }
      }else{
        for(i=0;i<opciones.length;i++){
          q = query(collection(db, "boleta2000","registros","viviendas"),where(pregunta,'==',opciones[i]),where('departamento','==',departamento));
          snapshot = await getCountFromServer(q);
          cantidad = snapshot.data().count
          total = total + cantidad;
          cantidades.push(cantidad);
          console.log(cantidades[i]);
        }
      }
    }else{
      cantidades[0] = 0;
      cantidades[1] = 0;
      if(departamento===""){
        q = query(collection(db, "boleta2000","registros","viviendas"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc)=>{
          tam = doc.data().pregunta09.length;
          if(tam!==0){
            cantidades[0] = cantidades[0]+1;
          }else{
            cantidades[1] = cantidades[1]+1;
          }
        })
        total = cantidades[0]+cantidades[1];
      }else{
        q = query(collection(db, "boleta2000","registros","viviendas"),where('departamento','==',departamento));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc)=>{
          tam = doc.data().pregunta09.length;
          if(tam!==0){
            cantidades[0] = cantidades[0]+1;
          }else{
            cantidades[1] = cantidades[1]+1;
          }
        })
        total = cantidades[0]+cantidades[1];
      }
      opciones=['Si','No'];
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

  return (
    
    <div className='contenedor-e'>
        <Menu/>
        <h1 className='titulo'>Estadísticas de Vivienda</h1>
        
        <div className='contenedor-estadisticas'>
        <select className='input' value={variable} onChange={(event)=>setVariable(event.target.value)}>
          <option value="01">Tipo de vivienda</option>
          <option value="10">Material de construccion mas usado en pisos</option>
          <option value="11">Material de construccion mas en techos</option>
          <option value="14">Principalmente de donde proviene el agua que utilizan</option>
          <option value="13">Como se distribuye el agua que utiliza</option>
          <option value="15">Tiene servicio sanitario, bano o letrina</option>
          <option value="18">El servicio sanitario, bano o letrina tiene desague</option>
          <option value="19">Principal combustible o energia que utilizan para cocinar</option>
          <option value="20">Cuantas habitaciones ocupa el hogar, sin contar cuartos de bano y cocina</option>
          <option value="21">Del total de habitaciones en el hogar, cuantos se utilizan solo para dormir</option>
          <option value="22">Tenencia de la vivienda</option>
          <option value="09">Hay personas con discapacidad</option>
          </select>
        <select className='input' value={departamento} onChange={(event)=>setDepartamento(event.target.value)}>
          <option value="">Todos</option>
          <option value="La Paz">La Paz</option>
          <option value="Santa Cruz">Santa Cruz</option>
          <option value="Cochabamba">Cochabamba</option>
          <option value="Chuquisaca">Chuquisaca</option>
          <option value="Tarija">Tarija</option>
          <option value="Oruro">Oruro</option>
          <option value="Beni">Beni</option>
          <option value="Potosi">Potosi</option>
          <option value="Pando">Pando</option>
        </select>
        <button className='btn-generar' onClick={analisis}>Generar</button>

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

export default EstadisticasVivienda