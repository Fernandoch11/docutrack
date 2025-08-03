import React, { useEffect } from 'react'
import verifyToken from './check_sesson.js'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    
    useEffect(() => {
        const checkAccess = async () => {
            const token = localStorage.getItem('token');

            const isValid = await verifyToken(token);
            if (!isValid) {
                localStorage.removeItem('type');
                localStorage.removeItem('token');
                navigate('/');
            }
        };

        checkAccess();
    }, [navigate]);


    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('type');
        navigate('/');
    }

    const userType = JSON.stringify(localStorage.getItem('type'));

  return (
    userType === '"ADMIN"' ? (
      <>
         <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link to="/Admin" className="navbar-brand">DocuTrack</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li
                            className={`nav-item dropdown${dropdownOpen ? " show" : ""}`}
                            onMouseEnter={() => setDropdownOpen(true)}
                            onMouseLeave={() => setDropdownOpen(false)}
                        >
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded={dropdownOpen ? "true" : "false"}
                            >
                                Usuarios
                            </a>
                            <ul
                                className={`dropdown-menu${dropdownOpen ? " show" : ""}`}
                                aria-labelledby="navbarDropdown"
                            >
                                <li><Link to="/New_User" className="dropdown-item">Nuevo usuario (admin)</Link></li>
                            </ul>
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
                <Link to="/User" className="navbar-brand">DocuTrack</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li
                            className={`nav-item dropdown${dropdownOpen ? " show" : ""}`}
                            onMouseEnter={() => setDropdownOpen(true)}
                            onMouseLeave={() => setDropdownOpen(false)}
                        >
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded={dropdownOpen ? "true" : "false"}
                            >
                                Solicitudes
                            </a>
                            <ul
                                className={`dropdown-menu${dropdownOpen ? " show" : ""}`}
                                aria-labelledby="navbarDropdown"
                            >
                                <li><Link to="/Requests" className="dropdown-item">Listar Solicitudes</Link></li>
                                <li><Link to="/New_Request" className="dropdown-item">Crear Solicitud</Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div className="d-flex">
                    <button className='btn btn-primary w-20' onClick={logout}>Logout</button>
                </div>
            </div>
        </nav>
      </>
    )
  )
}
