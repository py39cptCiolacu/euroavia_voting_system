import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import './App.css';

import AdminLogin from './pages/AdminLogin/AdminLogin';
import AdminRegister from './pages/AdminRegister/AdminRegister';
import AdminLogout from './pages/AdminLogout/AdminLogout';
import AdminHome from './pages/AdminHome/AdminHome';
import SuperAdminLogin from './pages/SuperAdminLogin/SuperAdminLogin';
import SuperAdminRegister from './pages/SuperAdminRegister/SuperAdminRegister';


import Navbar from './components/Navbar/Navbar';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

function App() {

  const [username, setUsername] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'))

  useEffect( () => {
    const token = localStorage.getItem('token');
    if (token) {
      setUsername(username);
      setIsAuthenticated(true);
    } else {
      setUsername('');
      setIsAuthenticated(false);
    }
  } , []);

  return (
    <Router>
      <div className = 'App'>
        <Navbar isAuthenticated ={isAuthenticated} />
        <Routes>
          <Route path = '/admin_login' element = {<AdminLogin setIsAuthenticated={setIsAuthenticated}/>}></Route>
          <Route path = '/admin_register'  element = {<AdminRegister/>}></Route>
          <Route path = '/super_admin_login' element = {<SuperAdminLogin/>}></Route>
          <Route path = '/super_admin_register'  element = {<SuperAdminRegister/>}></Route>
          <Route path = '/admin_logout' element = {<PrivateRoute> <AdminLogout setIsAuthenticated={setIsAuthenticated} setUsername={setUsername}/> </PrivateRoute>}></Route>
          <Route path = '/admin_home' element = {<PrivateRoute> <AdminHome/> </PrivateRoute>}></Route>
        </Routes>
      </div>
    </Router>

  );
}

  function PrivateRoute({children}) {
    const token = localStorage.getItem('token')
    console.log(token)
    return token ? children : <Navigate to='/admin_login'/>
  }


export default App;
