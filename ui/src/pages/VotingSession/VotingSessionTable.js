import React, { useState, useEffect } from 'react';
import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn } from 'mdb-react-ui-kit';

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

const VotingSessionTable = () => {
  const [sessions, setSessions] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8080/api/v1/visualize_voting_sessions', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // JWT token from localStorage
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

  return (
    <div>
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
    </div>
  );
};

export default VotingSessionTable;
