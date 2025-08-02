import {useForm} from 'react-hook-form'
import {Link} from 'react-router-dom'
import Navbar from './navbar';

export default function New_Request() {

    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("userid", localStorage.getItem('id'));
    formData.append("nombre", data.nombre);
    formData.append("apellido", data.apellido);
    formData.append("cedula", data.cedula);


    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    try {
      const res = await fetch("http://localhost:8000/api/auth/createrequest", {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Error al subir");

      const resData = await res.json();
      
      if(resData.id){
        alert('Solicitud Creada');
        reset();
      }

    } catch (err) {
      console.error("Error al subir:", err);
    }
  };

  return (
    <>
    <Navbar/>
      <div className="maincontent">
        <div className="container vh-100 d-flex align-items-center justify-content-center">
<div className="row w-100">
                
                <div className="col-md-3"></div>
                <div className="col-md-6 d-flex flex-column align-items-center">
                  <div className="w-100" style={{maxWidth: "400px"}}>
                    <form onSubmit={handleSubmit(onSubmit)}>

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
                        <label htmlFor="rqfile" className='form-label'>Adjuntar Imagen</label>
                        <input type="file" className="form-control" id="rqfile" accept="image/*" {...register("image", { required: true })}/>
                      </div>
                      <button type="submit" className="btn btn-primary w-100">Crear Solicitud</button>

                      <div className="mt-3 text-center">
                      </div>
                    </form>
                  </div>
                </div>
              </div>
        </div>
      </div>
    </>
  );
}
