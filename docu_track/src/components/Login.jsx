import {useForm} from 'react-hook-form'
import {Link, useNavigate} from 'react-router-dom'

function Login(){
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

                      /*
                        Este es el formato de mi respuesta:
                        {
                            "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE3NTQxMDMyMjYsImV4cCI6MTc1NDEwNjgyNiwibmJmIjoxNzU0MTAzMjI2LCJqdGkiOiJzc3FGRDJQM3VyZnEzSHN5Iiwic3ViIjoiNCIsInBydiI6ImRlNzQ3NTZmNjQyZDA0NTc3ZDJkMGViMDJlOThlOGY0YjUzYjk2NTMifQ.Dxr29PmTsovKFMHFofSfjJA_B035RHfUa6dEPR1uPLw",
                            "token_type": "bearer",
                            "expires_in": 3600,
                            "user": {
                                "id": 4,
                                "tipo_usuario": "USER"
                            }
                        }
                      */
                      fetch('http://localhost:8000/api/auth/login', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(files),
                      })
                      .then(response => response.json())
                      .then(data => {

                        if(!data.error){
                        //guardar el token en localStorage
                        localStorage.setItem('token', data.access_token);

                        const {user:{tipo_usuario, id}} = data;

                        localStorage.setItem('id', id);
                        localStorage.setItem('type', tipo_usuario);

                        tipo_usuario === 'USER' ? navigate('/user') : navigate('/Admin');
                        }else{
                          alert("Usuario o contraseña incorrectos");
                        }
                      }
                      )
                      .catch((error) => {

                      });
                    })}>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">Correo</label>
                        <input type="email" className="form-control" id="email" placeholder="Escribe tu correo" {...register("email", {required:true})}/>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input type="password" className="form-control" id="pass" placeholder="Escribe la contraseña" {...register("pass", {required:true})} />
                      </div>
                      <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
                      <div className="mt-3 text-center">
                        <Link to="/Register">Registrate</Link> | <a href="#">¿Olvidaste tu contraseña?</a>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-md-3"></div>
              </div>
            </div>
          </div>
      </>
    )
}
export default Login;