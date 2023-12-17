import React from 'react';
import MaintenanceRequests from './MaintenanceRequests';
import OngoingMaintenance from './OngoingMaintenance';
import { Link, useLocation } from 'react-router-dom';

function StudentPage() {
  const location = useLocation();
  const Id = location.pathname.split('/').pop();

  // Log the userId to the console
  console.log('User ID:', Id);

  return (
    <div className='main-container'>
          <div className="student-page-container">
      <div className="left-section">
        <MaintenanceRequests />
        <Link to={`/add-request/${Id}`}>
          <button>Add Request</button>
        </Link>
      </div>
      <div className="right-section">
        <OngoingMaintenance />
      </div>
    </div>
    </div>

  );
}

export default StudentPage;
