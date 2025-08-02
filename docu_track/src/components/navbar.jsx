import React from 'react'
import verifyToken from './check_sesson.js'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
    const navigate = useNavigate();
    const data = verifyToken(localStorage.getItem('token'));
    
    if(!data){
        return (
            <>
                {setTimeout(() => {
                    navigate('/');}
                , 1)}
            </>
        );
    }

    function logout() {
        localStorage.removeItem('token');
        navigate('/');
    }

    const userType = JSON.stringify(localStorage.getItem('type'));

  return (
    userType === '"ADMIN"' ? (
      <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                        </li>
                    </ul>
                </div>
                <div className="d-flex">
                    <button className='btn btn-primary w-20' onClick={logout}>Logout</button>
                </div>
            </div>
        </nav>
      </>
    ) : (
      <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                        </li>
                    </ul>
                </div>
                <div className="d-flex">
                    <button className='btn btn-primary w-20' onClick={logout}>X</button>
                </div>
            </div>
        </nav>
      </>
    )
  )
}
