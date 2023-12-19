import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function MaintenanceRequestDetail() {
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
          {/* Add more details if needed */}
        </div>
      </div>
    </div>
  );
}

export default MaintenanceRequestDetail;
