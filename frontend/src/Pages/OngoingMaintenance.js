import React from 'react';

function OngoingMaintenance() {
  // Sample list of ongoing maintenance
  const ongoingMaintenance = [
    'Ongoing Task 1',
    'Ongoing Task 2',
    'Ongoing Task 3',
    // Add more ongoing tasks as needed
  ];

  return (
    <div>
      <h2>Ongoing Maintenance</h2>
      <ul>
        {ongoingMaintenance.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  );
}

export default OngoingMaintenance;