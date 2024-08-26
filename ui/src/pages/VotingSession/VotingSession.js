import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import VotingSessionForm from './VotingSessionForm';
import VottingSessionTable from './VotingSessionTable';

function VotingSession() {
  const [sessions, setSessions] = useState([]);

  const addSession = (newSession) => {
    setSessions([...sessions, newSession]);
  };

  return (
    <MDBContainer style={{"padding": "50px"}}>
      <MDBRow>
        <MDBCol md="4">
          <VotingSessionForm addSession={addSession} />
        </MDBCol>
        <MDBCol md="8">
          <VottingSessionTable sessions={sessions} />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default VotingSession;
