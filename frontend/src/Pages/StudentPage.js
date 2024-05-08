import React, { useState, useEffect } from 'react';
import MaintenanceRequests from './MaintenanceRequests';
import StudentOngoingMaintenance from './StudentOngoingMaintenance';
import StudentNotifications from './StudentNotifications';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JavaScript bundle
import { Collapse } from 'bootstrap'; // Import the Collapse component from Bootstrap

function StudentPage() {
  const location = useLocation();
  const userId = location.pathname.split('/').pop();
  const [activeTab, setActiveTab] = useState('maintenanceRequests');

  useEffect(() => {
    // Initialize collapse plugin
    const collapsible = document.querySelectorAll('.collapse');
    collapsible.forEach(collapse => {
      new Collapse(collapse);
    });
  }, []);

  return (
    <div>
      <div className="container-fluid display-table">
        <div className="row display-table-row">
          <div className="col-md-2 col-sm-1 hidden-xs display-table-cell v-align box" id="navigation">
            <div className="logo">
              <a href="home.html"></a>
            </div>
            <div className="navi">
              <ul>
                <li className="active"><a href="#"><i className="fa fa-home" aria-hidden="true"></i><span className="hidden-xs hidden-sm">Dashboard</span></a></li>
                <li><a href="#"><i className="fa fa-tasks" aria-hidden="true"></i><span className="hidden-xs hidden-sm">Home</span></a></li>
                <li><a href="#"><i className="fa fa-bar-chart" aria-hidden="true"></i><span className="hidden-xs hidden-sm">Calender</span></a></li>
                <li><a href="#"><i className="fa fa-user" aria-hidden="true"></i><span className="hidden-xs hidden-sm">Contact us</span></a></li>
                <li><a href="#"><i className="fa fa-calendar" aria-hidden="true"></i><span className="hidden-xs hidden-sm">Settings</span></a></li>
                <li><a href="/"><i className="fa fa-cog" aria-hidden="true"></i><span className="hidden-xs hidden-sm">Log out</span></a></li>
              </ul>
            </div>
          </div>
          <div className="col-md-10 col-sm-11 display-table-cell v-align">
            <div className="user-dashboard">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a
                    className={`nav-link ${activeTab === 'maintenanceRequests' ? 'active' : ''}`}
                    onClick={() => setActiveTab('maintenanceRequests')}
                    href="#"
                  >
                    Maintenance Requests
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${activeTab === 'ongoingMaintenance' ? 'active' : ''}`}
                    onClick={() => setActiveTab('ongoingMaintenance')}
                    href="#"
                  >
                    Ongoing Maintenance Requests
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${activeTab === 'notifications' ? 'active' : ''}`}
                    onClick={() => setActiveTab('notifications')}
                    href="#"
                  >
                    Notifications
                  </a>
                </li>
              </ul>
              <div className="tab-content">
                {activeTab === 'maintenanceRequests' && (
                  <div className="tab-pane fade show active">
                    <MaintenanceRequests userId={userId} />
                    <Link to={`/add-request/${userId}`}>
                      <button type="button" className="btn btn-secondary btn-lg" >Add Request</button>
                    </Link>
                  </div>
                )}
                {activeTab === 'ongoingMaintenance' && (
                  <div className="tab-pane fade show active">
                    <StudentOngoingMaintenance userId={userId} />
                  </div>
                )}
                {activeTab === 'notifications' && (
                  <div className="tab-pane fade show active">
                    <StudentNotifications userId={userId} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentPage;
