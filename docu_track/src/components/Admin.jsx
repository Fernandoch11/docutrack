import {Link, useNavigate} from 'react-router-dom'
import Navbar from './navbar'
import verifyToken from './check_sesson'
import React, { useState,  useEffect } from 'react';


export default function Admin() {
    const [correcciones, setCorrecciones] = useState({});
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


  const ChangeStatus = async (status, id, comentario = '') => {
    let newStatus = '';

    if(status === 'Corregido'){
        newStatus = 'En Validacion'
    }else{
        if(status === 'Corregir'){
            newStatus = status
        }else{
            if(status === 'Recibido'){
                newStatus = 'En Validacion'
            }else if(status === 'En Validacion'){
                newStatus = 'Emitido'
            }
        }
    }

    try {
        const formData = new FormData();
        formData.append('id', id);
        formData.append('status', newStatus)

        if (comentario) formData.append('comment', comentario);

        const resp = await fetch("http://localhost:8000/api/auth/updateStatusComment",{
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
            
            setCorrecciones((prev) => ({ ...prev, [id]: '' }));
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
                        <th>Rechazar</th>
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

                        </td>
                        <td>
                            {(item.status === 'Recibido' || item.status === 'Corregido') && (
                                <button className="btn btn-primary btn-sm" onClick={() => ChangeStatus(item.status, item.id)}>
                                    Validación
                                </button>
                            )}

                            {item.status === 'En Validacion' && (
                                <>
                                    {/* Botón Corregir que activa el input */}
                                    <button className="btn btn-warning btn-sm me-2 mt-1" onClick={() => setCorrecciones((prev) => ({
                                        ...prev,
                                        [item.id]: ''
                                    }))}>
                                    Corregir
                                    </button>

                                    {/* Input y botón de confirmación (solo si el id está activado) */}
                                    {correcciones[item.id] !== undefined && (
                                        <div className="mt-2">
                                            <input type="text" className="form-control form-control-sm" placeholder="Motivo de corrección" value={correcciones[item.id]}
                                            onChange={(e) =>
                                                setCorrecciones((prev) => ({
                                                ...prev,
                                                [item.id]: e.target.value
                                                }))}/>

                                            <button className="btn btn-danger btn-sm mt-1" onClick={() => ChangeStatus('Corregir', item.id, correcciones[item.id])}> Enviar Corrección</button>
                                        </div>
                                    )}

                                    {/* Botón para emitir directamente */}
                                    <button className="btn btn-success btn-sm mt-2" onClick={() => ChangeStatus(item.status, item.id)}>Emitir</button>
                                </>
                          )}
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
