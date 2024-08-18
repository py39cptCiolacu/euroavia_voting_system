import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBCard,
         MDBCardBody,
         MDBInput,
         MDBBtn,
         MDBContainer
} from 'mdb-react-ui-kit';

const AdminLogin = ({setIsAuthenticated}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://127.0.0.1:8080/api/v1/admin_login', 
                {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password},)
                });

            if (!response.ok){
                throw new Error('Login failed');
            }

            const data = await response.json();

            if (response.status === 200) {
              console.log("salut sunt aici")
              localStorage.setItem('token', data.access_token);
              setIsAuthenticated(true);
              navigate('/admin_home')
            }
        }
        catch(error) {
            console.error('Error', error)
            alert('Login failed. Please check your credentials')
        }
    };
    
    return (
        <MDBContainer className="d-flex justify-content-center align-items-center vh-100">
        <MDBCard style={{ maxWidth: '400px', borderRadius: '15px' }}>
          <MDBCardBody className="p-4">
            <h3 className="text-center mb-4">Login</h3>
            <form onSubmit={handleLogin}>
              <MDBInput
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mb-4"
              />
              <MDBInput
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mb-4"
              />
              <MDBBtn type="submit" className="w-100" color="primary">
                Login
              </MDBBtn>
            </form>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    )

}

export default AdminLogin;