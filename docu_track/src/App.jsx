import './app.css'
import Login from './components/login.jsx'
import Admin from './components/Admin.jsx'
import User from './components/User.jsx'
import Register from './components/register.jsx'
import New_Request from './components/New_Request.jsx'
import Requests from './components/Requests.jsx'
import { Route, BrowserRouter, Link, Routes } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/User" element={<User />}/>
      <Route path="/Admin" element={<Admin />}/>
      <Route path="/Register" element={<Register />}/>
      <Route path="/New_Request" element={<New_Request/>}/>
      <Route path="/Requests" element={<Requests/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
