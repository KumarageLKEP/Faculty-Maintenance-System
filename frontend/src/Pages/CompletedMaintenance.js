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
    <div className="main-container">
      <div className="table-responsive">
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th>Description</th>
              <th>Completed At</th>
            </tr>
          </thead>
          <tbody>
            {completedMaintenance.map((task, index) => (
              <tr key={index}>
                <td>{task.description}</td>
                <td>{task.completedAt}</td> {/* Assuming completedAt is a property in your task object */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CompletedMaintenance;