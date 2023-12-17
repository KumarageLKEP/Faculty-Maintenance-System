import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function MaintenanceRequests() {
  const { Id } = useParams();
  const submittedBy = Id;
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMaintenanceRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/maintenanceRequests/${submittedBy}`);
        setMaintenanceRequests(response.data.existingMaintenanceRequests);
      } catch (error) {
        setError(error.response?.data?.message || 'Error fetching maintenance requests');
      }
    };

    fetchMaintenanceRequests();
  }, [submittedBy]);

  return (
    <div>
      <h2>Maintenance Requests</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {maintenanceRequests.map((request) => (
            <li key={request._id}>
              {request.place} - {request.issueType}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MaintenanceRequests;
