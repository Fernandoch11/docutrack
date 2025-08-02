import {Link, useNavigate} from 'react-router-dom'
import verifyToken from './check_sesson.js'
import Navbar from './navbar'

export default function Admin() {

    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    console.log(token);

    const data = verifyToken(token)

    let flag = true;
    if(data.tipo_usuario){
        flag = false;
    }

    if (!token || !flag) {
        return (
            <>
                {setTimeout(() => {
                    navigate('/');}
                , 1)}
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
