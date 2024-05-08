import React, { useState } from 'react';
import CompletedMaintenance from './CompletedMaintenance';
import OngoingMaintenance from './OngoingMaintenance';
import { Link } from 'react-router-dom';
import AllRequests from './AllRequests';
import { useEffect } from 'react';

function StudentPage() {
  const [activeTab, setActiveTab] = useState('allmaintenanceRequests');

  return (
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
              <li><a href="#"><i className="fa fa-bar-chart" aria-hidden="true"></i><span className="hidden-xs hidden-sm">Calendar</span></a></li>
              <li><a href="#"><i className="fa fa-user" aria-hidden="true"></i><span className="hidden-xs hidden-sm">Calendar</span></a></li>
              <li><a href="#"><i className="fa fa-calendar" aria-hidden="true"></i><span className="hidden-xs hidden-sm">Contact Us</span></a></li>
              <li><a href="/"><i className="fa fa-cog" aria-hidden="true"></i><span className="hidden-xs hidden-sm">Log out</span></a></li>
            </ul>
          </div>
        </div>
        <div className="col-md-10 col-sm-11 display-table-cell v-align">
          <div className="user-dashboard">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a
                  className={`nav-link ${activeTab === 'allmaintenanceRequests' ? 'active' : ''}`}
                  onClick={() => setActiveTab('allmaintenanceRequests')}
                  href="#"
                >
                  All Requests Maintenance Requests
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
                  className={`nav-link ${activeTab === 'completedMaintenance' ? 'active' : ''}`}
                  onClick={() => setActiveTab('completedMaintenance')}
                  href="#"
                >
                  Completed Maintenance
                </a>
              </li>
            </ul>

            <div className="tab-content">
              {activeTab === 'allmaintenanceRequests' && (
                <div className="tab-pane fade show active">
                  <AllRequests />
                  <Link to="/">
                    <button>Add Request</button>
                  </Link>
                </div>
              )}

              {activeTab === 'ongoingMaintenance' && (
                <div className="tab-pane fade show active">
                  <OngoingMaintenance />
                </div>
              )}
              {activeTab === 'completedMaintenance' && (
                <div className="tab-pane fade show active">
                  <CompletedMaintenance />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentPage;
