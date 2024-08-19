import React, {useState} from "react";
import {
    MDBContainer,
    MDBInput,
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
  } from 'mdb-react-ui-kit';

const CreateApp = () => {
    const [appName, setAppName] = useState('');
    const [passwordCount, setPasswordCount] = useState(0);
    const [colorHex, setColorHex] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Handle form submission here
      console.log('App Name:', appName);
      console.log('Number of Passwords:', passwordCount);
      console.log('Color (Hex):', colorHex);
    };
  
    return (
      <MDBContainer className="d-flex justify-content-center align-items-center vh-100">
        <MDBCard style={{ maxWidth: '400px' }}>
          <MDBCardHeader className="text-center">
            <h4>App Configuration Form</h4>
          </MDBCardHeader>
          <MDBCardBody>
            <form onSubmit={handleSubmit}>
              <MDBInput
                label="App Name"
                id="appName"
                type="text"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                required
                className="mb-4"
              />
              <MDBInput
                label="Number of Passwords"
                id="passwordCount"
                type="number"
                value={passwordCount}
                onChange={(e) => setPasswordCount(e.target.value)}
                min="1"
                required
                className="mb-4"
              />
              <MDBInput
                label="Color (Hex)"
                id="colorHex"
                type="text"
                value={colorHex}
                onChange={(e) => setColorHex(e.target.value)}
                pattern="^#([A-Fa-f0-9]{6})$"
                required
                className="mb-4"
              />
              <MDBBtn type="submit" className="w-100">
                Submit
              </MDBBtn>
            </form>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    );
}

export default CreateApp;