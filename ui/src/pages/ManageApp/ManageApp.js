import React, { useState } from 'react';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBTooltip,
  MDBIcon,
  MDBTypography
} from 'mdb-react-ui-kit';

function ManageApp() {
  const [resetPasswordConfirmation, setResetPasswordConfirmation] = useState('');
  const [resetAppConfirmation, setResetAppConfirmation] = useState('');
  const [deleteAppConfirmation, setDeleteAppConfirmation] = useState('');

  const handlePasswordReset = (e) => {
    e.preventDefault();
    if (resetPasswordConfirmation === 'RESET-PASSWORDS') {
      console.log('Passwords have been reset.');
      alert('Passwords have been reset.');
      setResetPasswordConfirmation(''); // Clear the input after resetting
    } else {
      alert('Please type "RESET-PASSWORDS" to confirm.');
    }
  };

  const handleResetEverything = (e) => {
    e.preventDefault();
    if (resetAppConfirmation === 'RESET-APP') {
      console.log('Everything has been reset.');
      alert('Everything has been reset.');
      setResetAppConfirmation(''); // Clear the input after resetting
    } else {
      alert('Please type "RESET-APP" to confirm.');
    }
  };

  const handleDeleteApp = (e) => {
    e.preventDefault();
    if (deleteAppConfirmation === 'DELETE-APP') {
      console.log('App has been delete.');
      alert('App has been deleted.');
      setDeleteAppConfirmation(''); // Clear the input after resetting
    } else {
      alert('Please type "DELETE-APP" to confirm.');
    }
  };

  return (
    <MDBContainer className="mt-5">
      <MDBTypography tag="h3" className="text-center mb-4">
        Manage Your App
      </MDBTypography>
      <MDBRow className="row-cols-1 row-cols-md-2 g-4">

        {/* Reset Passwords Card */}
        <MDBCol>
          <MDBCard style={{ height: '100%' }}>
            <MDBCardHeader className="d-flex justify-content-between align-items-center">
              <h5 className="text-center w-100">Reset Passwords</h5>
              <MDBTooltip tag="span" title='Type "RESET-PASSWORDS" to confirm'>
                <MDBBtn floating size="sm" color="info">
                  <MDBIcon icon="info-circle" />
                </MDBBtn>
              </MDBTooltip>
            </MDBCardHeader>
            <MDBCardBody className="d-flex flex-column justify-content-center align-items-center">
              <form onSubmit={handlePasswordReset} style={{ width: '100%' }}>
                <MDBInput
                  label='Type "RESET-PASSWORDS" to confirm'
                  value={resetPasswordConfirmation}
                  onChange={(e) => setResetPasswordConfirmation(e.target.value)}
                  required
                  className="mb-3"
                />
                <MDBBtn type="submit" color="warning">
                  Reset Passwords
                </MDBBtn>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        {/* Reset Everything Card */}
        <MDBCol>
          <MDBCard style={{ height: '100%' }}>
            <MDBCardHeader className="d-flex justify-content-between align-items-center">
              <h5 className="text-center w-100">Reset Everything</h5>
              <MDBTooltip tag="span" title='Type "RESET-APP" to confirm'>
                <MDBBtn floating size="sm" color="info">
                  <MDBIcon icon="info-circle" />
                </MDBBtn>
              </MDBTooltip>
            </MDBCardHeader>
            <MDBCardBody className="d-flex flex-column justify-content-center align-items-center">
              <form onSubmit={handleResetEverything} style={{ width: '100%' }}>
                <MDBInput
                  label='Type "RESET-APP" to confirm'
                  value={resetAppConfirmation}
                  onChange={(e) => setResetAppConfirmation(e.target.value)}
                  required
                  className="mb-3"
                />
                <MDBBtn type="submit" color="danger">
                  Reset Everything
                </MDBBtn>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol>
          <MDBCard style={{ height: '100%' }}>
            <MDBCardHeader className="d-flex justify-content-between align-items-center">
              <h5 className="text-center w-100">Delete App</h5>
              <MDBTooltip tag="span" title='Type "DELETE-APP" to confirm'>
                <MDBBtn floating size="sm" color="info">
                  <MDBIcon icon="info-circle" />
                </MDBBtn>
              </MDBTooltip>
            </MDBCardHeader>
            <MDBCardBody className="d-flex flex-column justify-content-center align-items-center">
              <form onSubmit={handleDeleteApp} style={{ width: '100%' }}>
                <MDBInput
                  label='Type "DELETE-APP" to confirm'
                  value={deleteAppConfirmation}
                  onChange={(e) => setDeleteAppConfirmation(e.target.value)}
                  required
                  className="mb-3"
                />
                <MDBBtn type="submit" color="danger">
                  Reset Everything
                </MDBBtn>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
};

export default ManageApp;
