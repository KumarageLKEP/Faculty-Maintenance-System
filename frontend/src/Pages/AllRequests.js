import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Import the CSS file
import 'bootstrap/dist/css/bootstrap.min.css';


function AllRequests() {
  const [maintenanceRequests, setAllRequests] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllRequests = async () => {
      try {
        const response = await axios.get('http://localhost:8000/maintenanceRequests');
        const pendingRequests = response.data.existingMaintenanceRequests.filter(request => request.status === 'Pending');
        setAllRequests(pendingRequests);
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
    <table className="table table-dark table-striped">
      <thead>
        <tr>
          <th>Description</th>
          <th>Place</th>
        </tr>
      </thead>
      <tbody>
        {error ? (
          <tr>
            <td colSpan="2">Error: {error}</td>
          </tr>
        ) : (
          <>
            {maintenanceRequests.map((request) => (
              <tr key={request._id}>
                <td>{request.description}</td>
                <td>{request.place}</td>
                <td>
                  <button
                    onClick={() => handleButtonClick(request._id)}
                    className="button-style"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </>
        )}
      </tbody>
    </table>
  );
}  

export default AllRequests;