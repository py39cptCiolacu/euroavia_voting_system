import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'

import AdminLogin from './pages/AdminLogin/AdminLogin'
import AdminRegister from './pages/AdminRegister/AdminRegister'
import SuperAdminLogin from './pages/SuperAdminLogin/SuperAdminLogin'
import SuperAdminRegister from './pages/SuperAdminRegister/SuperAdminRegister'

import Navbar from './components/Navbar/Navbar';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

function App() {



  return (
    <Router>
      <div className = 'App'>
        <Navbar isAutehnticated={false} />
        <Routes>
          <Route path = '/admin_login' element = {<AdminLogin/>}></Route>
          <Route path = '/admin_register'  element = {<AdminRegister/>}></Route>
          <Route path = '/super_admin_login' element = {<SuperAdminLogin/>}></Route>
          <Route path = '/super_admin_register'  element = {<SuperAdminRegister/>}></Route>
        </Routes>
      </div>
    </Router>


  );
}

export default App;
