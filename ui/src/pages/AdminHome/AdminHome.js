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

    const handleDownloadCSV = () => {
        const url = "http://127.0.0.1:8080/api/v1/download_csv";
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.blob();
                }
                throw new Error("Network response was not ok.");
            })
            .then(blob => {
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'date.csv'); // Numele fișierului care va fi descărcat
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            })
            .catch(error => console.error("There was an error downloading the CSV file:", error));
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
                    <MDBBtn style={buttonStyle} onClick={handleDownloadCSV}>Download CSV</MDBBtn>
                </MDBCol>

                <MDBCol size="9">
                    <MDBCard>
                        <MDBCardBody>
                            <MDBCardTitle>MyApp</MDBCardTitle>
                            <MDBCardText>
                                <strong>Status:</strong> Active & Approved <br />
                                <strong>AppName:</strong> BucharestVotingApp <br />
                                <strong>Link:</strong> <a href="https://myvotingapp.com" target="_blank" rel="noopener noreferrer">https://myvotingapp.com</a> <br />
                                <strong>No. of Votes:</strong> 100 <br />
                                <strong>Expiration date:</strong> 15/07/2024
                            </MDBCardText>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default AdminHome;
