import React from 'react';
import MaintenanceRequests from './MaintenanceRequests';
import StudentOngoingMaintenance from './StudentOngoingMaintenance';
import StudentNotifications from './StudentNotifications'; // Import the StudentNotifications component
import { Link, useLocation } from 'react-router-dom';

function StudentPage() {
  const location = useLocation();
  const userId = location.pathname.split('/').pop();

  // Log the userId to the console
  console.log('User ID:', userId);

  return (
    <div className='main-container'>
      <div className="student-page-container">
        <div className="left-section">
          
          <MaintenanceRequests />
          <Link to={`/add-request/${userId}`}>
            <button>Add Request</button>
          </Link>
        </div>
        <div className="right-section">
        <StudentNotifications userId={userId} /> 
        <StudentOngoingMaintenance userId={userId} />
          
        </div>
      </div>
    </div>
  );
}

export default StudentPage;
