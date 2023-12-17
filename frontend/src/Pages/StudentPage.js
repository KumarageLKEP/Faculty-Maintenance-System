import React from 'react';
import MaintenanceRequests from './MaintenanceRequests';
import OngoingMaintenance from './OngoingMaintenance';
import { Link } from 'react-router-dom';



function StudentPage() {
  return (
    <div className="student-page-container">
      <div className="left-section">
        <MaintenanceRequests />
        <Link to="/add-request">
          <button>Add Request</button>
        </Link>
      </div>
      <div className="right-section">
        <OngoingMaintenance />
      </div>
    </div>
  );
}

export default StudentPage;
