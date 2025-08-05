import { useForm } from 'react-hook-form'
import React, { useState, useEffect } from 'react'
import Navbar from './navbar'
import verifyToken from './check_sesson'
import { useNavigate } from 'react-router-dom'

export default function EditRequest() {
  const [datos, setDatos] = useState(null);
  const [autorizado, setAutorizado] = useState(null); // null: cargando, false: no autorizado, true: autorizado
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get('id');

  const checkAuthAndFetchData = async () => {
    const userType = localStorage.getItem('type');
    const token = localStorage.getItem('token');

    // Verificamos tipo de usuario
    if (userType !== 'USER' || !token) {
      localStorage.removeItem('type');
      localStorage.removeItem('token');
      setAutorizado(false);
      return;
    }

    // Verificamos token
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
      formData.append('id', id);

      const response = await fetch("http://localhost:8000/api/auth/searchrequest", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const { rows } = await response.json();
      if (rows) {
        setDatos(rows);
        reset({
          nombre: rows.nombre,
          apellido: rows.apellido,
          cedula: rows.cedula,
          id: id
        });
      }
    } catch (err) {
      console.error("Error al obtener datos:", err);
    }
  };

  useEffect(() => {
    checkAuthAndFetchData();
  }, []);

  useEffect(() => {
    if (autorizado === false) {
      navigate('/');
    }
  }, [autorizado, navigate]);

  if (autorizado === null || datos === null) {
    return <div className="container mt-5">Cargando...</div>;
  }

  const onSubmit = async (data) => {
    try {
      const newStatus = 'Corregido';

      const formData = new FormData();
      formData.append('nombre', data.nombre);
      formData.append('apellido', data.apellido);
      formData.append('cedula', data.cedula);
      formData.append('id', data.id);
      formData.append('status', newStatus);

      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      const resp = await fetch("http://localhost:8000/api/auth/editrequest", {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      if (!resp.ok) {
        throw new Error(`Error HTTP: ${resp.status}`);
      }

      const { rows } = await resp.json();
      if (rows > 0) {
        navigate('/Requests');
      }

    } catch (error) {
      console.error("Error al enviar la corrección:", error);
    }
  }

  return (
    <>
      <Navbar />
      <div className="maincontent">
        <div className="container vh-100 d-flex align-items-center justify-content-center">
          <div className="row w-100">
            <div className="col-md-3"></div>
            <div className="col-md-6 d-flex flex-column align-items-center">
              <div className="w-100" style={{ maxWidth: "400px" }}>
                <form onSubmit={handleSubmit(onSubmit)}>

                  <div className="mb-3">
                    <label htmlFor="nombre" className='form-label'>Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nombre"
                      placeholder="Escribe tu nombre"
                      {...register("nombre", { required: true })}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="apellido" className='form-label'>Apellido</label>
                    <input
                      type="text"
                      className="form-control"
                      id="apellido"
                      placeholder="Escribe tu apellido"
                      {...register("apellido", { required: true })}
                    />
                  </div>

                  <input type="hidden" {...register('id', { required: true })} />

                  <div className="mb-3">
                    <label htmlFor="cedula" className='form-label'>Cédula</label>
                    <input
                      type="text"
                      className="form-control"
                      id="cedula"
                      placeholder="Escribe tu cédula"
                      {...register("cedula", { required: true })}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="rqfile" className='form-label'>Adjuntar Imagen</label>
                    <input
                      type="file"
                      className="form-control"
                      id="rqfile"
                      accept="image/*"
                      {...register("image", { required: true })}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-100">Corregir</button>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}