import React, { useEffect, useState } from 'react';
import axios from 'axios';


function CompletedMaintenance() {
  const [completedMaintenance, setCompletedMaintenance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompletedMaintenance = async () => {
      try {
        const response = await axios.get('http://localhost:8000/maintenanceRequests');
        const completedMaintenance = response.data.existingMaintenanceRequests.filter(
          task => task.status === 'Completed'
        );
        setCompletedMaintenance(completedMaintenance);
      } catch (error) {
        setError(error.response?.data?.message || 'Error fetching maintenance requests');
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedMaintenance();
  }, []);

  

  return (
    <div className='main-container'>
      <h2>Completed Maintenance</h2>
      <ul>
        {completedMaintenance.map((task, index) => (
          <li key={index}>
            <div>{task.description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CompletedMaintenance;
