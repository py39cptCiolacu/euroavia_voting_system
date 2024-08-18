import React from "react";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBTypography,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText
} from 'mdb-react-ui-kit';


const AdminHome = () => {
    const buttonStyle = {
        backgroundColor: '#003366',
        color: '#fff',
        width: '200px', // Fixează lățimea butoanelor pentru a fi uniforme
        textAlign: 'center',
        margin: '5px 0', // Margine între butoane
      };

    return (
        <MDBContainer fluid className="p-5">
        <MDBRow className="align-items-center mb-4">
          <MDBCol size="12" className="text-center">
            <MDBTypography tag="h1" className="mb-0">Admin Panel</MDBTypography>
          </MDBCol>
        </MDBRow>
        
        <MDBRow>
          <MDBCol size="3">
            <MDBBtn style={buttonStyle}>Create a New App</MDBBtn>
            <MDBBtn style={buttonStyle}>Manage current app</MDBBtn>
            <MDBBtn style={buttonStyle}>Account Settings</MDBBtn>
          </MDBCol>
  
          <MDBCol size="9">
            <MDBCard>
              <MDBCardBody>
                <MDBCardTitle>MyApp</MDBCardTitle>
                <MDBCardText>
                  <strong>Status:</strong> Active & Approved <br />
                  <strong>AppName:</strong> BucharestVotingApp <br />
                  <strong>Link:</strong> <a href="https://myvotingapp.com" target="_blank" rel="noopener noreferrer">https://myvotingapp.com</a> <br />
                  <strong>No. of Votes:</strong> 100
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    )
}

export default AdminHome;