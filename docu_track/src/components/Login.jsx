import {useForm} from 'react-hook-form'
function Login(){

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
                      fetch('http://localhost:8000/login', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(files)
                      })
                    })}>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">Correo</label>
                        <input type="email" className="form-control" id="email" placeholder="Escribe tu correo" {...register("email", {required:true})}/>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input type="password" className="form-control" id="password" placeholder="Escribe la contraseña" {...register("password", {required:true})} />
                      </div>
                      <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
                      <div className="mt-3 text-center">
                        <a href="#">Registrate</a> | <a href="#">¿Olvidaste tu contraseña?</a>
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