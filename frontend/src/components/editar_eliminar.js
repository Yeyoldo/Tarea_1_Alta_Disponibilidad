import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer'
import Swal from 'sweetalert2'

export default function Commit() {
  const [data, setdata] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);



  useEffect(() => {
    const getCommit = async () => {
      fetch('http://localhost:3000/commit2', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idheroe: localStorage.getItem('idheroe')
        }),
      })
        .then(response => response.json())
        .then(value => {
          setdata(value);

        });
    };
    getCommit().catch(null);
  }, [refreshKey]);



  async function Editar(id, commit) {
    fetch('http://localhost:3000/Editar', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idcommit: id,
        commit: commit
      }),
    })
      .then((response) => response.json())
      .then(async (json) => {
        setRefreshKey(oldKey => oldKey + 1)
      })
      .catch((error) => {
        console.error(error);
      });

  }



  async function Eliminar(id) {
    fetch('http://localhost:3000/eliminar', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idcommit: id.target.getAttribute('value')
      }),
    })
      .then((response) => response.json())
      .then(async (json) => {
        setRefreshKey(oldKey => oldKey + 1)
      })
      .catch((error) => {
        console.error(error);
      });
  }


  
  function Alert(id) {
    Swal.fire({
      title: 'Comentario',
      html:
        '<input id="swal-input1" class="swal2-input">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          Editar(id.target.getAttribute('value'), document.getElementById('swal-input1').value)
        ]
      }
    })
  }


  return (

    <div style={{ position: 'absolute', left: '110px', top: '950px' }}>
      <center>
        <ToastContainer>

          {data.map(data => (
            <div >
              <Toast key={data.id_comentario} style={{ border: "5px solid blue", width: '1700px' }}>
                <Toast>
                  <strong className="me-auto"><h1>{data.usuario}</h1></strong>
                </Toast>
                <Toast.Body><h2>{data.comentario}</h2> </Toast.Body>
                <Button style={{ background: "red" }} variant="primary" value={data.id_comentario} onClick={Eliminar}>eliminar comentario</Button>
                <br></br>
                <Button style={{ background: "green" }} variant="primary" value={data.id_comentario} onClick={Alert}>Editar comentario</Button>
              </Toast>
            </div>
          ))}

        </ToastContainer>
      </center>
      <br></br>
      <br></br>
      <br></br>
    </div>

  );
}