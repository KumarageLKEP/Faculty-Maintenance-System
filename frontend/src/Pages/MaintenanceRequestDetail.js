import React, { useEffect, useState } from 'react';
import axios from 'axios';





import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate

import '../App.css';
import classes from '../Pages/maintainancedetails.module.css'

function MaintenanceRequestDetail() {
  const navigate = useNavigate(); // Initialize navigate
  const { id } = useParams();
  const [maintenanceRequest, setMaintenanceRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMaintenanceRequest = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/maintenanceRequest/${id}`);
        console.log('API Response:', response.data); // Log the entire API response

        if (response.data.success) {
          setMaintenanceRequest(response.data.maintenanceRequest);
        } else {
          setError('Failed to fetch maintenance request');
        }
      } catch (error) {
        console.error('Error fetching maintenance request:', error); // Log the error
        setError('Error fetching maintenance request');
      } finally {
        setLoading(false);
      }
    };

    fetchMaintenanceRequest();
  }, [id]);

  console.log('Maintenance Request:', maintenanceRequest); // Log the maintenanceRequest

  const handleApprove = async () => {
    try {
      // Send a POST request to approve the maintenance request
      const approveResponse = await axios.post(`http://localhost:8000/maintenanceRequest/${id}/approve`);
      
      if (approveResponse.data.success) {
        // Update maintenanceRequest state to reflect the status change
        setMaintenanceRequest(prevState => ({
          ...prevState,
          status: 'In Progress'
        }));
  
        // Send a notification to the relevant user
        const notificationResponse = await axios.post('http://localhost:8000/sendNotification', {
          userId: maintenanceRequest.submittedBy, // Use the submittedBy field for the user ID
          message: `Your maintenance request of ${maintenanceRequest.description} has been approved and is now in progress.`
        });
  
        if (notificationResponse.data.success) {
          // Notification sent successfully
          console.log('Notification sent successfully');
        } else {
          // Error sending notification
          console.error('Failed to send notification:', notificationResponse.data.message);
        }
  
        // Navigate back to the previous page
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
      // Send a POST request to reject the maintenance request
      const rejectResponse = await axios.post(`http://localhost:8000/maintenanceRequest/${id}/reject`);
      
      if (rejectResponse.data.success) {
        // Remove the maintenance request from the list
        setMaintenanceRequest(null);

        const notificationResponse = await axios.post('http://localhost:8000/sendNotification', {
          userId: maintenanceRequest.submittedBy, // Use the submittedBy field for the user ID
          message: `Your maintenance request of ${maintenanceRequest.description} has been rejected.`
        });
  
        if (notificationResponse.data.success) {
          // Notification sent successfully
          console.log('Notification sent successfully');
        } else {
          // Error sending notification
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

  // Check if maintenanceRequest is null
  if (maintenanceRequest === null) {
    return <p>Loading...</p>;
  }

  // Decode the image
  const imageBase64 = maintenanceRequest.image.toString('base64');
  const decodedImage = `data:image/jpeg;base64,${imageBase64}`;

  return (
    <div className= {classes.Details_container}>
      <div>
        <div className={classes.Details_container}>
        <div className="row">

          <div className="col-lg-9 mt-2 mb-2">
            <h4 className={classes.request_text}>Maintenance Request Details</h4>
          </div>
        </div>

        <div>
          <p className={classes.container_1}>Place: {maintenanceRequest.place}</p>
          <p className={classes.container_1}>Issue Type: {maintenanceRequest.issueType}</p>
          <p className={classes.container_1}>Description: {maintenanceRequest.description}</p>
          {maintenanceRequest.image && (
            <div>
              <p className={classes.container_1}>Image:</p>
              <img className={classes.container_1}
                src={decodedImage}
                alt="Maintenance Request"
                style={{ maxWidth: '100%', maxHeight: 'auto' }}
              />
            </div>
          )}


          <p className={classes.container_1}>Priority: {maintenanceRequest.priority}</p>
          <p className={classes.container_1}> Status: {maintenanceRequest.status}</p>
          <button onClick={handleApprove} className={classes.button1}>Approve</button>
          <button onClick={handleReject} className={classes.button2}>Reject</button>
          </div>

        </div>
      </div>
      </div>
    </div>
  );
}

export default MaintenanceRequestDetail;