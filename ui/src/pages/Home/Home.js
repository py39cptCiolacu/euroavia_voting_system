import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

const Home = () => {
  const { appName } = useParams();
  const location = useLocation();
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [data, setData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8080/api/v1/${appName}/home`);
        if (response.status === 404) {
          // Redirect to the desired page if 404 is returned
          navigate('/page404'); // Replace '/page-x' with your desired path
          return;
        }
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
        console.log(result);
        console.log(data.message);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchData();
  }, [appName, location.pathname, navigate]);

  return (
    <div>
      <h1>Welcome to {data.message}</h1>
    </div>
  );
};

export default Home;
