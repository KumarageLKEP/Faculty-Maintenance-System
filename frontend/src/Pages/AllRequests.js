import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Import the CSS file

function AllRequests() {
  const [maintenanceRequests, setAllRequests] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllRequests = async () => {
      try {
        const response = await axios.get('http://localhost:8000/maintenanceRequests');
        setAllRequests(response.data.existingMaintenanceRequests);
      } catch (error) {
        setError(error.response?.data?.message || 'Error fetching maintenance requests');
      }
    };

    fetchAllRequests();
  }, []);

  const handleButtonClick = (requestId) => {
    navigate(`/maintenanceRequest/${requestId}`);
  };

  return (
    <div className='main-container'>
      <h2>Maintenance Requests</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {maintenanceRequests.map((request) => (
            <li key={request._id}>
              <div>
                {request.description} - {request.place}
                <button
                  onClick={() => handleButtonClick(request._id)}
                  className="button-style" // Apply the CSS class
                >
                  View Details
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AllRequests;
