import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
  MDBContainer
} from 'mdb-react-ui-kit';

const PasswordCheck = () => {
  const { appName } = useParams();
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkPageExists = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8080/api/v1/${appName}/password_check`);

        if (response.status === 404) {
          navigate('/page404');
          return;
        }

        if (!response.ok) {
          console.error('Unexpected response status:', response.status);
          throw new Error('Page check failed');
        }
      } catch (error) {
        console.error('Error during page check:', error);
        navigate('/page404');
      }
    };

    checkPageExists();
  }, [appName, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://127.0.0.1:8080/api/v1/${appName}/password_check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (response.status === 404) {
        navigate('/page404');
        return;
      }

      if (!response.ok) {
        console.error('Login failed, status code:', response.status);
        throw new Error('Login failed');
      }

      const data = await response.json();

      if (response.status === 200) {
        navigate('/voting_page');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login failed. Please check your password');
    }
  };

  return (
    <MDBContainer className="d-flex justify-content-center align-items-center vh-100">
      <MDBCard style={{ maxWidth: '400px', borderRadius: '15px' }}>
        <MDBCardBody className="p-4">
          <h3 className="text-center mb-4">Login</h3>
          <form onSubmit={handleLogin}>
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
  );
};

export default PasswordCheck;
