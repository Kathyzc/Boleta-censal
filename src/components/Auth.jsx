import React,{useState} from "react";
import '../estilos/Autenticacion.css'
import {getAuth,signInWithEmailAndPassword,signOut} from 'firebase/auth';
import userEvent from "@testing-library/user-event";
import { useUser } from "reactfire";
import imagen from "../imagenes/imagen-login.png";
import { Navigate, useNavigate } from "react-router-dom/dist";
import { collectionGroup } from "firebase/firestore";
export default (props)=>{ 
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const navegate = useNavigate();
    const login = async ()=>{
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{
            console.log("funciona");
            navegate("/paginaPrincipal");
        })
        .catch((error)=>{
            alert("no existe el usuario")
        });
    }
    return(
        <div className="contenedor-login">
            <div className="contenedor-imagen-login" >
                <img src={imagen} alt="Imagen-IniciarSesion" />
            </div>
            <div className="formulario">
                <h1>Iniciar Sesión</h1>
                <label className="elemento-texto" htmlFor="email">Correo:</label>
                <input className="elemento" type="email" id="email" onChange={(ev)=>setEmail(ev.target.value)} />
                <label className="elemento-texto" htmlFor="password">Contraseña:</label>
                <input className="elemento" type="password" id="password" onChange={(ev)=>setPassword(ev.target.value)} />
                <button className="boton-login" onClick={login}>Ingresar</button>
            </div>
        </div>
    )
}