import React from 'react';

function MaintenanceRequests() {
  // Sample list of maintenance requests
  const maintenanceRequests = [
    'Request 1',
    'Request 2',
    'Request 3',
    // Add more maintenance requests as needed
  ];

  return (
    <div>
      <h2>Maintenance Requests</h2>
      <ul>
        {maintenanceRequests.map((request, index) => (
          <li key={index}>{request}</li>
        ))}
      </ul>
    </div>
  );
}

export default MaintenanceRequests;