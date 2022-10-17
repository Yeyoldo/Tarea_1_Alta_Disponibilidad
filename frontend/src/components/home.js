import React, { useState,useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Heroe() {
    const [data, setdata] = useState([]);

    useEffect(() => {
        const getheroes = async () => {
            fetch("http://localhost:3000/home")
                .then(response => response.json())
                .then(value => {
                    setdata(value);
                    console.log(data)
                    
                });
        };
        getheroes().catch(null);
    }, []);

    function Redic(id){
        localStorage.setItem('idheroe',id.target.getAttribute('value'))
        window.location.href="/commit"
    }
    


    return(
        <center>
        <div style={{left:'700px',top:'400px'}}>
            <div className='row'>
            {data.map(data => (
                
                <div className='col-4 mb-3' key={data.id_heroe}>
                    <Card Style='width: 15rem' style={{background:'#43C4F1'}}>
                        <Card.Img variant="top" src={"../../iconos/"+data.id_heroe+".jpg"}/>
                        <Card.Body>
                        <Card.Title>{data.nombre}</Card.Title>
                        <Card.Text>
                            {data.rol}
                        </Card.Text>
                        <center><Button style={{background:'green'}} key={data.id_heroe} value={data.id_heroe} onClick={Redic}>Comentar</Button></center>
                        </Card.Body>
                    </Card>
                </div>
            ))}
            </div>
        </div>
        </center>
        
    );

}
