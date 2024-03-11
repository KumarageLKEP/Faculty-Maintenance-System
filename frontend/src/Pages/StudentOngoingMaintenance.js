import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StudentOngoingMaintenance({ userId }) {
  const [ongoingMaintenance, setOngoingMaintenance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOngoingMaintenance = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/maintenanceRequest/ongoingMaintenance/${userId}`);
        setOngoingMaintenance(response.data.ongoingMaintenance);
      } catch (error) {
        setError(error.response?.data?.message || 'Error fetching ongoing maintenance');
      } finally {
        setLoading(false);
      }
    };

    fetchOngoingMaintenance();
  }, [userId]);

  return (
    <div className='main-container'>
      <h2>Your Ongoing Maintenance</h2>
      <ul>
        {ongoingMaintenance.map((task, index) => (
          <li key={index}>
            <div>{task.description}</div>
            <div>Status: {task.status}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentOngoingMaintenance;
