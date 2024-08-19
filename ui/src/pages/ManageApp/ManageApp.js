import React, { useState } from 'react';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBSwitch,
  MDBInput,
  MDBTooltip,
  MDBIcon,
  MDBTypography
} from 'mdb-react-ui-kit';

function ManageApp() {
  const [status, setStatus] = useState('Inactive');
  const [motionText, setMotionText] = useState('');
  const [resetPasswordConfirmation, setResetPasswordConfirmation] = useState('');
  const [resetAppConfirmation, setResetAppConfirmation] = useState('');

  const handleStatusToggle = () => {
    const confirmToggle = window.confirm(`Are you sure you want to set the status to ${status === 'Active' ? 'Inactive' : 'Active'}?`);
    if (confirmToggle) {
      setStatus(status === 'Active' ? 'Inactive' : 'Active');
    }
  };

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

  const handleSetMotion = (e) => {
    e.preventDefault();
    console.log('New motion set to:', motionText);
    alert(`New motion set to: ${motionText}`);
  };

  const handleResetEverything = (e) => {
    e.preventDefault();
    if (resetAppConfirmation === 'RESET-APP') {
      setStatus('Inactive');
      setMotionText('');
      console.log('Everything has been reset.');
      alert('Everything has been reset.');
      setResetAppConfirmation(''); // Clear the input after resetting
    } else {
      alert('Please type "RESET-APP" to confirm.');
    }
  };

  return (
    <MDBContainer className="mt-5">
      <MDBTypography tag="h3" className="text-center mb-4">
        Manage Your App
      </MDBTypography>
      <MDBRow className="row-cols-1 row-cols-md-2 g-4">
        {/* Set Status Card */}
        <MDBCol>
          <MDBCard style={{ height: '100%' }}>
            <MDBCardHeader className="d-flex justify-content-between align-items-center">
              <h5 className="text-center w-100">Set Status</h5>
              <MDBTooltip tag="span" title="Toggle the status between Active and Inactive">
                <MDBBtn floating size="sm" color="info">
                  <MDBIcon icon="info-circle" />
                </MDBBtn>
              </MDBTooltip>
            </MDBCardHeader>
            <MDBCardBody className="d-flex justify-content-center align-items-center">
              <MDBSwitch
                label={status === 'Active' ? 'Active' : 'Inactive'}
                checked={status === 'Active'}
                onChange={handleStatusToggle}
              />
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

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
                <MDBBtn type="submit" color="danger">
                  Reset Passwords
                </MDBBtn>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        {/* Set New Motion Card (Direct Input) */}
        <MDBCol>
          <MDBCard style={{ height: '100%' }}>
            <MDBCardHeader className="d-flex justify-content-between align-items-center">
              <h5 className="text-center w-100">Set New Motion</h5>
              <MDBTooltip tag="span" title="Enter the new motion and click 'Set Motion'">
                <MDBBtn floating size="sm" color="info">
                  <MDBIcon icon="info-circle" />
                </MDBBtn>
              </MDBTooltip>
            </MDBCardHeader>
            <MDBCardBody className="d-flex flex-column justify-content-center align-items-center">
              <form onSubmit={handleSetMotion} style={{ width: '100%' }}>
                <MDBInput
                  type="textarea"
                  label="Enter New Motion"
                  rows="4"
                  value={motionText}
                  onChange={(e) => setMotionText(e.target.value)}
                  required
                  className="mb-3"
                />
                <MDBBtn type="submit" color="primary">
                  Set Motion
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
                <MDBBtn type="submit" color="warning">
                  Reset Everything
                </MDBBtn>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default ManageApp;
