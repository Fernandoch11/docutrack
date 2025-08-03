import {Link, useNavigate} from 'react-router-dom'
import Navbar from './navbar'
import verifyToken from './check_sesson'
import React, { useState,  useEffect } from 'react';


export default function Admin() {
    const [datos, setDatos] = useState([]);
    const [autorizado, setAutorizado] = useState(null); // null: cargando, false: no autorizado, true: autorizado
    const navigate = useNavigate();


    const checkAuthAndFetchData = async () => {
        const userType = localStorage.getItem('type');
        const token = localStorage.getItem('token');

        //verificamos usuario
        if(userType !== 'ADMIN' || !token) {
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
            const response = await fetch("http://localhost:8000/api/auth/listrequestsAdmin",{
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                });
            
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }

                const { rows } = await response.json();

                if(rows){
                    setDatos([...rows]);
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


  const ChangeStatus = async (status, id) => {
    let newStatus = '';

    if(status === 'Corregir'){
        newStatus = 'Corregir'
    }else{
        if(status === 'Recibido'){
            newStatus = 'En Validacion'
        }else if(status === 'En Validacion'){
            newStatus = 'Emitido'
        }
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
            
            //alert('Actualizado Correctamente')
            await checkAuthAndFetchData();
            
        }
    } catch (error) {
        error
    }

  }


    return (
      <>
        <Navbar/>
        <div className="maincontent1 vh-100">
          <div className="container mt-5 d-flex">
            <div className="row">
              <div className="col-md-2"></div>
              <div className="col-md-8">
                <h2 id="h2">Solicitudes Pendientes</h2>
                <div className="lista-container">
                  <table className="tabla-datos border">
                    <thead>
                      <tr id="trid">
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Cedula</th>
                        <th>Status</th>
                        <th>Creado</th>
                        <th>Adjunto</th>
                        <th>Progreso</th>
                        <th>Certificado</th>
                        <th>Pasar a</th>

                      </tr>
                    </thead>
                    <tbody>
                      {datos.map((item) => (
                        <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.nombre}</td>
                        <td>{item.apellido}</td>
                        <td>{item.cedula}</td>
                        <td>{item.status}</td>
                        <td>{item.created_at}</td>
                        <td><a href={"http://localhost:8000/imgs/"+item.file_route} target='_blank'>Descargar</a></td>
                        <td>
                              <span style={{fontSize:"12px"}}>{`${item.progress}%`}</span>
                              <div className="skill-bar">
                                  
                                  <div className="skill-level" style={{width:`${item.progress}%`}}></div>
                              </div>
                        </td>
                        <td>
                          {parseInt(item.progress) === 100 ? <a href={`/Printer?nom=`+item.nombre+`&ap=`+item.apellido+`&ced=`+item.cedula+`&dt=`+item.emitido} target='_blank'>Descargar</a> : ""}
                        </td>
                        <td><button className="btn btn-primary" style={{fontSize:"12px"}} onClick={() => ChangeStatus(item.status, item.id)}>{item.status === 'Recibido' || item.status === 'Corregido' ? 'Validación' : 'Emitido'}</button>
                        <p></p>
                        {item.status === 'En Validacion' ? <button className='btn btn-primary' style={{fontSize:"12px"}} onClick={() => ChangeStatus('Corregir', item.id)}>Corregir</button> : ''}

                        </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
  
              </div>
              <div className="col-md-2"></div>
            </div>
          </div>
        </div> 
      </>
    );
  }
