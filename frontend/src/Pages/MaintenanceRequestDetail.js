import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import '../App.css';
import classes from '../Pages/maintainancedetails.module.css';

function MaintenanceRequestDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [maintenanceRequest, setMaintenanceRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMaintenanceRequest = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/maintenanceRequest/${id}`);
        console.log('API Response:', response.data);

        if (response.data.success) {
          setMaintenanceRequest(response.data.maintenanceRequest);
        } else {
          setError('Failed to fetch maintenance request');
        }
      } catch (error) {
        console.error('Error fetching maintenance request:', error);
        setError('Error fetching maintenance request');
      } finally {
        setLoading(false);
      }
    };

    fetchMaintenanceRequest();
  }, [id]);

  const handleApprove = async () => {
    try {
      const approveResponse = await axios.post(`http://localhost:8000/maintenanceRequest/${id}/approve`);
      
      if (approveResponse.data.success) {
        setMaintenanceRequest(prevState => ({
          ...prevState,
          status: 'In Progress'
        }));

        const notificationResponse = await axios.post('http://localhost:8000/sendNotification', {
          userId: maintenanceRequest.submittedBy,
          message: `Your maintenance request of ${maintenanceRequest.description} has been approved and is now in progress.`
        });
  
        if (notificationResponse.data.success) {
          console.log('Notification sent successfully');
        } else {
          console.error('Failed to send notification:', notificationResponse.data.message);
        }
  
        navigate(-1);
      } else {
        setError('Failed to approve maintenance request');
      }
    } catch (error) {
      console.error('Error approving maintenance request:', error);
      setError('Error approving maintenance request');
    }
  };

  const handleReject = async () => {
    try {
      const rejectResponse = await axios.post(`http://localhost:8000/maintenanceRequest/${id}/reject`);
      
      if (rejectResponse.data.success) {
        setMaintenanceRequest(null);

        const notificationResponse = await axios.post('http://localhost:8000/sendNotification', {
          userId: maintenanceRequest.submittedBy,
          message: `Your maintenance request of ${maintenanceRequest.description} has been rejected.`
        });
  
        if (notificationResponse.data.success) {
          console.log('Notification sent successfully');
        } else {
          console.error('Failed to send notification:', notificationResponse.data.message);
        }
        navigate(-1);
      } else {
        setError('Failed to reject maintenance request');
      }
    } catch (error) {
      console.error('Error rejecting maintenance request:', error);
      setError('Error rejecting maintenance request');
    }
  };

  if (maintenanceRequest === null) {
    return <p>Loading...</p>;
  }

  const imageBase64 = maintenanceRequest.image.toString('base64');
  const decodedImage = `data:image/jpeg;base64,${imageBase64}`;

  return (
    <div className={classes.Details_container}>
      <div className={classes.Details_container}>
        <div className="row">
          <div className="col-lg-9 mt-2 mb-2">
            <h4 className={classes.request_text}>Maintenance Request Details</h4>
          </div>
        </div>
        <div className="col-md-10 col-sm-11 display-table-cell v-align">
          <div className="user-dashboard">
            <div className="curved-box">
              <h3>Maintenance Request Details</h3>
              
              <table className="table table-sm">
                <tbody>
                  <tr>
                    <td>Place</td>
                    <td>{maintenanceRequest.place}</td>
                  </tr>
                  <tr>
                    <td>Issue Type</td>
                    <td>{maintenanceRequest.issueType}</td>
                  </tr>
                  <tr>
                    <td>Description</td>
                    <td>{maintenanceRequest.description}</td>
                  </tr>
                  <tr>
                    <td>Priority</td>
                    <td>{maintenanceRequest.priority}</td>
                  </tr>
                  <tr>
                    <td>Status</td>
                    <td>{maintenanceRequest.status}</td>
                  </tr>
                  {maintenanceRequest.image && (
                    <tr>
                      <td>Image</td>
                      <td>
                        <img 
                          src={decodedImage}
                          alt="Maintenance Request"
                          style={{ maxWidth: '100%', maxHeight: 'auto' }}
                        />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <button onClick={handleApprove} type="button" className="btn btn-secondary btn-sm">Approve</button>
              <button onClick={handleReject} type="button" className="btn btn-secondary btn-sm">Reject</button>
              {error && <p className="text-danger mt-3">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MaintenanceRequestDetail;
