import {Link} from 'react-router-dom'
import Navbar from './navbar'

export default function Admin() {

    const userType = localStorage.getItem('type');
    const token = localStorage.getItem('token');

    console.log(userType, token + " desde admin");

    if (userType !== 'ADMIN' && token) {
        return (
            <>
            <div className="container vh-100 d-flex align-items-center justify-content-center">
                <div className="row">
                    <div className="col-md-4">
                    </div>
                    <div className="col-md-4 w-100">
                        <div className="alert alert-danger" role="alert">
                            Acceso denegado. Solo los administradores pueden acceder a esta página.
                        </div>
                    </div>
                    <div className="col-md-4">
                    </div>
                </div>
            </div>
            </>
        );
    }


  return (
    <>
        <Navbar />
        <h1>Hola</h1>
    </>
  )
}
