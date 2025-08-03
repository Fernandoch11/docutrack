import React, { useEffect } from 'react'
import Navbar from './navbar'
import verifyToken from './check_sesson'
import { useNavigate } from 'react-router-dom';

export default function User() {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAccess = async () => {
            const userType = localStorage.getItem('type');
            const token = localStorage.getItem('token');

            if (userType !== 'USER') {
                localStorage.removeItem('type');
                localStorage.removeItem('token');
                navigate('/');
                return;
            }

            const isValid = await verifyToken(token);
            if (!isValid) {
                localStorage.removeItem('type');
                localStorage.removeItem('token');
                navigate('/');
            }
        };

        checkAccess();
    }, [navigate]);

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
    );
}
