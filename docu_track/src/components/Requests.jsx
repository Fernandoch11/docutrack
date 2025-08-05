import React, { useState,  useEffect } from 'react';
import Navbar from './navbar';
import verifyToken from './check_sesson';
import { useNavigate } from 'react-router-dom';

function Requests() {
  
  const [datos, setDatos] = useState([]);
  const [autorizado, setAutorizado] = useState(null); // null: cargando, false: no autorizado, true: autorizado
  const navigate = useNavigate();


      const checkAuthAndFetchData = async () => {
      const userType = localStorage.getItem('type');
      const token = localStorage.getItem('token');

      //verificamos usuario
      if (userType !== 'USER' || !token) {
        localStorage.removeItem('type');
        localStorage.removeItem('token');
        setAutorizado(false);
        return;
      }

      //verificamos token
      const isValid = await verifyToken(token);
      if (!isValid) {
        localStorage.removeItem('type');
        localStorage.removeItem('token');
        setAutorizado(false);
        return;
      }

      setAutorizado(true);


      try {

        const formData = new FormData();
        formData.append('userid', localStorage.getItem('id'));
        //implementar paginacion
        //formData.append('from', 0);
        //formData.append('to', 20);

        const response = await fetch("http://localhost:8000/api/auth/listrequests",{
           method: "POST",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData,
        });
        
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const { rows } = await response.json();
        console.log(rows)
        if(rows){
          setDatos(rows);
        }
      } catch (err) {
        err
      }
    };



    useEffect(() => {
      checkAuthAndFetchData();
    }, []);

    if (autorizado === null) {
     return <div className="container mt-5">Cargando...</div>;
    }

    if (autorizado === false) {
          navigate('/');
    }

const ChangeStatus = async (status, id, redir = false) => {

  if(redir){
    window.location.href = '/EditRequest?id='+id
  }


  let newStatus = ''
  if(status === 'Corregir'){
    newStatus = 'Corregido'
  }

  try {

      const formData = new FormData();
      formData.append('id', id);
      formData.append('status', newStatus)

      const resp = await fetch("http://localhost:8000/api/auth/updateStatus",{
          method:'POST',
          headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body:formData
      });

      if (!resp.ok) {
        throw new Error(`Error HTTP: ${resp.status}`);
      }

      const { rows } = await resp.json();
      if(rows > 0){
        await checkAuthAndFetchData();
      }

  } catch (error) {
    error
  }
}
  

  return (
    <>
      <Navbar/>
      <div className="maincontent1" style={{width:'100%'}}>
        <div className="container mt-5 d-flex">
          <div className="row">
            
            <div className="col-md-12">
              <h2 id="h2">Lista de Solicitudes</h2>
              <div className="lista-container">
                
                <table className="tabla-datos border">
                  <thead>
                    <tr id="trid">
                      <th></th>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Apellido</th>
                      <th>Cedula</th>
                      <th>Status</th>
                      <th>Comentario</th>
                      <th>Creado</th>
                      <th>Progreso</th>
                      <th>Certificado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datos.map((item) => (
                      <tr key={item.id}>
                      <td>{item.status === 'Corregir' ? <button className='btn btn-primary' onClick={() =>{ChangeStatus(item.status, item.id, true)}}>Corregir</button> : ''}</td>
                      <td>{item.id}</td>
                      <td>{item.nombre}</td>
                      <td>{item.apellido}</td>
                      <td>{item.cedula}</td>
                      <td>{item.status}</td>
                      <td>{item.comment}</td>
                      <td>{item.created_at}</td>
                      <td>
                            <span style={{fontSize:"12px"}}>{`${item.progress}%`}</span>
                            <div className="skill-bar">
                                
                                <div className="skill-level" style={{width:`${item.progress}%`}}></div>
                            </div>
                      </td>
                      <td>
                        {parseInt(item.progress) === 100 ? <a href={`/Printer?nom=`+item.nombre+`&ap=`+item.apellido+`&ced=`+item.cedula+`&dt=`+item.emitido} target='_blank' rel="noopener noreferrer">Descargar</a> : ""}
                      </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
               
              </div>

            </div>

          </div>
        </div>
      </div> 
    </>
  );
}

export default Requests;
