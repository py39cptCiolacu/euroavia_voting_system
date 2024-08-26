import React, { useState } from 'react';
import { MDBCard, MDBCardBody, MDBBtn, MDBTextArea } from 'mdb-react-ui-kit';

const VotingSessionForm = ({ addSession }) => {
  const [motion, setMotion] = useState('');
  const [procentage, setProcentage] = useState(''); // Adăugăm un câmp pentru procentaj
  const [status, setStatus] = useState('STOP');
  const [errorMessage, setErrorMessage] = useState(''); // Stocăm mesajul de eroare

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Resetează mesajul de eroare

    try {
      const response = await fetch('http://127.0.0.1:8080//api/v1/create_voting_session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Presupunem că tokenul JWT este stocat în localStorage
        },
        body: JSON.stringify({ motion, procentage }),
      });

      const data = await response.json();

      if (response.status === 200) {
        addSession({ motion, status });
        setMotion('');
        setProcentage('');
        setStatus('STOP');
      } else if (response.status === 401) {
        setErrorMessage(data.message); // Afișează mesajul de eroare
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <MDBCard>
      <MDBCardBody>
        <h4>Create New Voting Session</h4>
        <form onSubmit={handleSubmit}>
          <MDBTextArea
            label="Motion"
            value={motion}
            onChange={(e) => setMotion(e.target.value)}
            rows="6"
          />
          <MDBTextArea
            label="Procentage"
            value={procentage}
            onChange={(e) => setProcentage(e.target.value)}
            rows="2"
          /> <br/>
          <MDBBtn color="primary" type="submit">
            Add Session
          </MDBBtn>
          {errorMessage && (
            <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>
          )}
        </form>
      </MDBCardBody>
    </MDBCard>
  );
};

export default VotingSessionForm;
