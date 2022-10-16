import React, { useState,useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'react-bootstrap/Image';

export default function Mostrarheroe() {
  const [data, setdata] = useState([]);
  useEffect(() => {
    const getheroe = async () => {
        fetch('http://localhost:3000/commit', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idheroe:localStorage.getItem('idheroe')
      }),
    })
            .then(response => response.json())
            .then(value => {
                setdata(value);
                
                
            });
    };
    getheroe().catch(null);


}, []);



    return(
    <center>
    <div>
      {console.log(data)}
      <Image src={"../../iconos/"+localStorage.getItem('idheroe')+".jpg"} fluid />
      {data.map(data => (
  
        <div style={{border: "5px solid blue", background: "white", filter:"alpha(opacity=60)",opacity:".6"}}>
            <h1>Nombre heroe:    {data.nombre}</h1>
            <h1>Rol heroe:    {data.rol}</h1>
            <h1>Ulti heroe:    {data.ulti}</h1>
        </div>

      ))}
      
    </div>
    </center>
  );
}