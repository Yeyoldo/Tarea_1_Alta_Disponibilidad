import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Commit from './editar_eliminar.js'
import Agregar from './agregar.js'
import Heroe from './heroe.js'
import './comentario.css'



export default function Comentario() {
    return (
        <div className="parent">
            <div className="div1"><Heroe /> </div>
            <div className="div2"><Agregar /> </div>
            <div className="div3"><Commit /></div>
        </div>
    );
}