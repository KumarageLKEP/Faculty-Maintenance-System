import React from 'react';
import OngoingMaintenance from './OngoingMaintenance';
import { Link} from 'react-router-dom';
import AllRequests from './AllRequests';

function StudentPage() {


  return (
    <div className='main-container'>
          <div className="student-page-container">
      <div className="left-section">
        <AllRequests />
        <Link to={ />/}>
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
