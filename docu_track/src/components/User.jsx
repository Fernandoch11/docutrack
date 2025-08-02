import React from 'react'
import Navbar from './navbar'

export default function User() {

    const userType = localStorage.getItem('type');
    const token = localStorage.getItem('token');
    if (userType !== 'USER' && token) {
        return (
            <>
                <div className="container vh-100 d-flex align-items-center justify-content-center">
                <div className="row">
                    <div className="col-md-4">
                    </div>
                    <div className="col-md-4 w-100">
                        <div className="alert alert-danger" role="alert">
                            Acceso denegado. Solo los usuarios pueden acceder a esta página.
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
        <div className="maincontent">
            <div className="container vh-100 d-flex align-items-center justify-content-center">
                <div className="row w-100">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        
                    </div>
                    <div className="col-md-4"></div>
                </div>
            </div>
        </div>
    </>
  )
}
