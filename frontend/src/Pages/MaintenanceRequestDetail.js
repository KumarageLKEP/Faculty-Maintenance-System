import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import '../App.css';

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
      const response = await axios.post(`http://localhost:8000/maintenanceRequest/${id}/approve`);
      if (response.data.success) {
        // Update maintenanceRequest state to reflect the status change
        setMaintenanceRequest(prevState => ({
          ...prevState,
          status: 'In Progress'
        }));
        
        // Navigate back to the previous page
        navigate(-1); // Go back one page
      } else {
        setError('Failed to approve maintenance request');
      }
    } catch (error) {
      console.error('Error approving maintenance request:', error);
      setError('Error approving maintenance request');
    }
  };
  

  const handleReject = async () => {
    // You can implement the logic for rejecting the maintenance request here
    // For example, you can make a POST request to your backend API to update the status of the maintenance request to "Rejected"
    // Example:
    // const response = await axios.post(`http://localhost:8000/maintenanceRequest/${id}/reject`);
    // if (response.data.success) {
    //   // Update maintenanceRequest state or perform any necessary actions
    // }
  };

  // Check if maintenanceRequest is null
  if (maintenanceRequest === null) {
    return <p>Loading...</p>;
  }

  // Decode the image
  const imageBase64 = maintenanceRequest.image.toString('base64');
  const decodedImage = `data:image/jpeg;base64,${imageBase64}`;

  return (
    <div>
      <div>
        <div className="row">
          <div className="col-lg-9 mt-2 mb-2">
            <h4>Maintenance Request Details</h4>
          </div>
        </div>

        <div>
          <p>Place: {maintenanceRequest.place}</p>
          <p>Issue Type: {maintenanceRequest.issueType}</p>
          <p>Description: {maintenanceRequest.description}</p>
          {maintenanceRequest.image && (
            <div>
              <p>Image:</p>
              <img
                src={decodedImage}
                alt="Maintenance Request"
                style={{ maxWidth: '100%', maxHeight: 'auto' }}
              />
            </div>
          )}
          <p>Priority: {maintenanceRequest.priority}</p>
          <p>Status: {maintenanceRequest.status}</p>
          <button onClick={handleApprove}>Approve</button>
          <button onClick={handleReject}>Reject</button>
        </div>
      </div>
    </div>
  );
}

export default MaintenanceRequestDetail;
