import React from 'react'
import {useForm} from 'react-hook-form'
import {Link, useNavigate} from 'react-router-dom'

export default function Register() {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
  return (
          <>
        <div className="maincontent">
          <div className="container vh-100 d-flex align-items-center justify-content-center">
              <div className="row w-100">
                
                <div className="col-md-3"></div>
                <div className="col-md-6 d-flex flex-column align-items-center">
                  <div className="w-100" style={{maxWidth: "400px"}}>
                    <h1 className="text-center">DocuTrack</h1>
                    <p className="text-center">Bienvenidos al Sistema de Seguimiento de Documentos. Por favor inicia sesión para continuar.</p>
                    <form onSubmit={handleSubmit((files) => {
                      // Aquí puedes manejar el inicio de sesión, por ejemplo, enviando los datos a un servidor

                      fetch('http://localhost:8000/api/auth/register', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(files),
                      })
                      .then(response => response.json())
                      .then(() => {
                        alert("Usuario registrado exitosamente");
                        navigate('/');
                      }
                      )
                      .catch((error) => {
                        console.error('Error:', error);
                      });
                    })}>

                    <div className="mb-3">
                        <label htmlFor="nombre" className='form-label'>Nombre</label>
                        <input type="text" className="form-control" id="nombre" placeholder="Escribe tu nombre" {...register("nombre", {required:true})}/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="apellido" className='form-label'>Apellido</label>
                        <input type="text" className="form-control" id="apellido" placeholder="Escribe tu apellido" {...register("apellido", {required:true})}/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="cedula" className='form-label'>Cédula</label>
                        <input type="text" className="form-control" id="cedula" placeholder="Escribe tu cédula" {...register("cedula", {required:true})}/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="nacimiento" className='form-label'>Fecha de Nacimiento</label>
                        <input type="date" className="form-control" id="nacimiento" placeholder="Escribe tu fecha de nacimiento" {...register("nacimiento", {required:true})}/>
                    </div>

                    <input type="hidden" name="tipo_usuario" value="USER"{...register("tipo_usuario", {required:true})}/>


                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">Correo</label>
                        <input type="email" className="form-control" id="email" placeholder="Escribe tu correo" {...register("email", {required:true})}/>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input type="password" className="form-control" id="pass" placeholder="Escribe la contraseña" {...register("pass", {required:true})} />
                      </div>
                      <button type="submit" className="btn btn-primary w-100">Registrate</button>

                        <div className="mt-3 text-center">              
                        <Link to="/">¿Regresar a Login?</Link>
                  
                        </div>
                      <div className="mt-3 text-center">
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </>
  )
}
