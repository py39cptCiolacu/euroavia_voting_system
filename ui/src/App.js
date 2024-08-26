import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import './App.css';

import AdminLogin from './pages/AdminLogin/AdminLogin';
import AdminRegister from './pages/AdminRegister/AdminRegister';
import AdminLogout from './pages/AdminLogout/AdminLogout';
import AdminHome from './pages/AdminHome/AdminHome';
import SuperAdminLogin from './pages/SuperAdminLogin/SuperAdminLogin';
import SuperAdminRegister from './pages/SuperAdminRegister/SuperAdminRegister';
import CreateApp from './pages/CreateApp/CreateApp';
import ManageApp from './pages/ManageApp/ManageApp'
import Results from './pages/Results/Results';
import CurrentVotingSession from './pages/CurrentVotingSession/CurrentVotingSession';
import VotingSession from './pages/VotingSession/VotingSession';
import Home from './pages/Home/Home';
import PasswordCheck from './pages/PasswordCheck/PasswordCheck';
import Page404 from './pages/Page404/Page404';

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
          <Route path = '/:appName/home' element = {<Home />}></Route>
          <Route path = '/:appName/password_check' element = {<PasswordCheck/>}></Route>
          <Route path = '/page404' element = {<Page404/>}></Route>
        
          <Route path = '/admin_login' element = {<AdminLogin setIsAuthenticated={setIsAuthenticated}/>}></Route>
          <Route path = '/admin_register'  element = {<AdminRegister/>}></Route>
          <Route path = '/super_admin_login' element = {<SuperAdminLogin/>}></Route>
          <Route path = '/super_admin_register'  element = {<SuperAdminRegister/>}></Route>


          <Route path = '/admin_logout' element = {<PrivateRoute> <AdminLogout setIsAuthenticated={setIsAuthenticated} setUsername={setUsername}/> </PrivateRoute>}></Route>
          <Route path = '/admin_home' element = {<PrivateRoute> <AdminHome/> </PrivateRoute>}></Route>
          <Route path = '/create_app' element = {<PrivateRoute> <CreateApp/> </PrivateRoute>}></Route>
          <Route path = '/manage_app' element = {<PrivateRoute> <ManageApp/> </PrivateRoute>}></Route>
          <Route path = '/results' element = {<PrivateRoute> <Results/> </PrivateRoute>}></Route>
          <Route path = '/voting_session' element = {<PrivateRoute> <VotingSession/> </PrivateRoute>}></Route>
          <Route path = '/current_voting_session' element = {<PrivateRoute> <CurrentVotingSession/> </PrivateRoute>}></Route>
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
