import './app.css'
import { Route, BrowserRouter, Link, Routes } from 'react-router-dom'
import Login from './components/login.jsx'
import Admin from './components/Admin.jsx'
import User from './components/User.jsx'
import Register from './components/register.jsx'
import New_Request from './components/New_Request.jsx'
import Requests from './components/Requests.jsx'
import Printer from './components/printer.jsx'
import New_User from './components/New_User.jsx'

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
      <Route path="/Printer" element={<Printer/>}></Route>
      <Route path="/New_User" element={<New_User/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
