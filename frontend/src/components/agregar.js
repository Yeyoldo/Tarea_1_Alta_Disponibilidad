import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/Button";
import React, { useState } from "react";

export default function Writting() {
  const [commit, setCommit] = useState("");

  function validateForm() {
    return commit.length > 0;
  }


  async function Agregar(){
      fetch('http://localhost:3000/agregar', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idheroe:localStorage.getItem('idheroe') ,
          user:localStorage.getItem('token'),
          commit: commit
        }),
      })
        .then((response) => response.json())
        .catch((error) => {
          console.error(error);
        });
    
  }

  
  function handleSubmit(event) {
    Agregar();
    event.preventDefault();
  }
    return(
      <Form onSubmit={handleSubmit}>
      <Form.Control
      as="textarea"
      placeholder="Escribe tu importante y hermoso comentario aquí"
      value={commit}
      onChange={(e)=> setCommit(e.target.value)}
      style={{height: '250px', width:'1700px'}}
    />
    <Button style={{background: "blue", width:'150px'}} variant="primary" type="submit" disabled={!validateForm()}>Comentar</Button>
    <br></br>
    </Form>
  
  );
  

}