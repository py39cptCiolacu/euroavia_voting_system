import React, { useState, useEffect } from 'react';
import {
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardTitle,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem
} from 'mdb-react-ui-kit';

const getStatusColor = (status) => {
  switch (status) {
    case 'STOP':
    case 'START':
      return '#336699';
    case 'VALID':
      return 'green';
    case 'INVALID':
      return 'red';
    default:
      return '';
  }
};

const CurrentVotingSession = () => {
  const [sessions, setSessions] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8080/api/v1/current_session', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Presupunem că tokenul JWT este stocat în localStorage
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSessions(data.voting_session); // Adjusted key to match corrected API response
        } else {
          const errorData = await response.json();
          setErrorMessage(errorData.message || 'Failed to fetch sessions');
        }
      } catch (error) {
        console.error('Error:', error);
        setErrorMessage('An unexpected error occurred. Please try again later.');
      }
    };

    fetchSessions();
  }, []);

  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
  };

  const handleSubmit = async () => {
    console.log(`Selected status: ${selectedStatus}`);

    // Prepare the data to be sent
    const futureStatus = selectedStatus;

    // Make the POST request to send the status to the backend
    try {
      const response = await fetch('http://127.0.0.1:8080/api/v1/current_session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // JWT token from localStorage
        },
        body: JSON.stringify({ futureStatus }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Response from backend:', data);
        // Optionally, refresh the sessions or show a success message
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Failed to update session status');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <MDBCard>
      <MDBCardHeader>
        <MDBCardTitle>Current Voting Session</MDBCardTitle>
      </MDBCardHeader>
      <MDBCardBody>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <MDBTable>
          <MDBTableHead>
            <tr>
              <th>Motion</th>
              <th>YES</th>
              <th>NO</th>
              <th>ABSTENTION</th>
              <th>Status</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {sessions.map((session, index) => (
              <tr key={index}>
                <td>{session.motion}</td>
                <td>{session.yes}</td>
                <td>{session.no}</td>
                <td>{session.abstention}</td>
                <td style={{ color: getStatusColor(session.status) }}>
                  {session.status}
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>

        <MDBDropdown className="mt-3">
          <MDBDropdownToggle color="primary">
            {selectedStatus || 'Select Status'}
          </MDBDropdownToggle>
          <MDBDropdownMenu>
            <MDBDropdownItem link onClick={() => handleStatusSelect('START')}>
              START
            </MDBDropdownItem>
            <MDBDropdownItem link onClick={() => handleStatusSelect('STOP')}>
              STOP
            </MDBDropdownItem>
            <MDBDropdownItem link onClick={() => handleStatusSelect('VALID')}>
              VALID
            </MDBDropdownItem>
            <MDBDropdownItem link onClick={() => handleStatusSelect('INVALID')}>
              INVALID
            </MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>

        <MDBBtn className="mt-3" color="success" onClick={handleSubmit}>
          Submit
        </MDBBtn>
      </MDBCardBody>
    </MDBCard>
  );
};

export default CurrentVotingSession;
