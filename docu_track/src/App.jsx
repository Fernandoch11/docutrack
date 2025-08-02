import './app.css'
import Login from './components/login.jsx'
import Admin from './components/Admin.jsx'
import Register from './components/register.jsx'
import { Route, BrowserRouter, Link, Routes } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />}/>
      {/*<Route path="/user" element={<User />}/>*/}
      <Route path="/Admin" element={<Admin />}/>
      <Route path="/Register" element={<Register />}/>
    </Routes>
      
    </BrowserRouter>
  )
}

export default App
