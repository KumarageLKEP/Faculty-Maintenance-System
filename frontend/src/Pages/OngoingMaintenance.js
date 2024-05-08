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

  const handleProgressChange = async (id, index, newProgress) => {
    const updatedMaintenance = [...ongoingMaintenance];
    updatedMaintenance[index].progress = newProgress;

    if (newProgress === 100) {
      updatedMaintenance[index].status = 'Completed';
      try {
        await axios.post(`http://localhost:8000/maintenanceRequest/${id}/completed`, { // Corrected URL with backticks and quotes
          status: 'Completed'
        });

        // Send a notification when the task is completed
        await axios.post('http://localhost:8000/sendNotification', {
          userId: updatedMaintenance[index].submittedBy,
          message: `Your maintenance request for "${updatedMaintenance[index].description}" has been completed.` // Enclosed message in backticks
        });

      } catch (error) {
        console.error('Error updating maintenance request status:', error);
      }
    }

    setOngoingMaintenance(updatedMaintenance);
  };

  return (
    <div className="table-responsive">
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th>Description</th>
            <th>Status</th>
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>
          {ongoingMaintenance.map((task, index) => (
            <tr key={index}>
              <td>{task.description}</td>
              <td>{task.status}</td>
              <td>
                <StatusBar
                  progress={task.progress}
                  onProgressChange={(newProgress) => handleProgressChange(task._id, index, newProgress)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OngoingMaintenance;
