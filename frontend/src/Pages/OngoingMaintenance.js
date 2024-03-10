import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StatusBar from './StatusBar';

function OngoingMaintenance() {
  const [ongoingMaintenance, setOngoingMaintenance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOngoingMaintenance = async () => {
      try {
        const response = await axios.get('http://localhost:8000/maintenanceRequests');
        const inProgressMaintenance = response.data.existingMaintenanceRequests.filter(
          task => task.status === 'In Progress'
        );
        setOngoingMaintenance(inProgressMaintenance);
      } catch (error) {
        setError(error.response?.data?.message || 'Error fetching maintenance requests');
      } finally {
        setLoading(false);
      }
    };

    fetchOngoingMaintenance();
  }, []);

  const handleProgressChange = async (id, index, newProgress) => { // Include the ID parameter
    const updatedMaintenance = [...ongoingMaintenance];
    updatedMaintenance[index].progress = newProgress;

    if (newProgress === 100) {
      updatedMaintenance[index].status = 'Completed';
      try {
        await axios.post(`http://localhost:8000/maintenanceRequest/${id}/completed`, { // Use the ID to make the PUT request
          status: 'Completed'
        });
      } catch (error) {
        console.error('Error updating maintenance request status:', error);
      }
    }

    setOngoingMaintenance(updatedMaintenance);
  };

  return (
    <div className='main-container'>
      <h2>Ongoing Maintenance</h2>
      <ul>
        {ongoingMaintenance.map((task, index) => (
          <li key={index}>
            <div>{task.description}</div>
            <div>Status: {task.status}</div>
            <StatusBar
              progress={task.progress}
              onProgressChange={(newProgress) => handleProgressChange(task._id, index, newProgress)} // Pass the ID to the handleProgressChange function
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OngoingMaintenance;
