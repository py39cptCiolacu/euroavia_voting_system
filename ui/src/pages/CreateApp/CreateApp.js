import React, { useState } from "react";
import {
  MDBContainer,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
} from "mdb-react-ui-kit";

const CreateApp = () => {
  const [appName, setAppName] = useState("");
  const [passwordCount, setPasswordCount] = useState(0);
  const [colorHex, setColorHex] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Retrieve token from localStorage
    const token = localStorage.getItem("token");

    const appData = {
      appName,
      passwordCount: passwordCount,
      colorHex,
    };

    try {
      const response = await fetch("http://127.0.0.1:8080/api/v1/create_app", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Include the token here
        },
        body: JSON.stringify(appData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("App created successfully!");
        console.log("App created:", data);
      } else {
        setMessage(data.message || "Failed to create app");
        console.log("Error:", data.message);
      }
    } catch (error) {
      setMessage("An error occurred while creating the app.");
      console.error("Error:", error);
    }
  };

  return (
    <MDBContainer className="d-flex justify-content-center align-items-center vh-100">
      <MDBCard style={{ maxWidth: "400px" }}>
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
          {message && <p className="mt-3 text-center">{message}</p>}
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default CreateApp;
