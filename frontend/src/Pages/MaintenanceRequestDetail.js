import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css';
import '../Pages/maintainancedetails.module.css';

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

  const sendNotification = async (userId, maintenanceId, message) => {
    try {
      const notificationResponse = await axios.post('http://localhost:8000/sendNotification', {
        userId,
        maintenanceId,
        message,
      });

      if (notificationResponse.data.success) {
        console.log('Notification sent successfully');
      } else {
        console.error('Failed to send notification:', notificationResponse.data.message);
      }
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  const handleApprove = async () => {
    try {
      const approveResponse = await axios.post(`http://localhost:8000/maintenanceRequest/${id}/approve`);
      
      if (approveResponse.data.success) {
        setMaintenanceRequest(prevState => ({
          ...prevState,
          status: 'In Progress'
        }));

        await sendNotification(
          maintenanceRequest.submittedBy,
          maintenanceRequest._id,
          `Your maintenance request of ${maintenanceRequest.description} has been approved and is now in progress.`
        );

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
        await sendNotification(
          maintenanceRequest.submittedBy,
          maintenanceRequest._id,
          `Your maintenance request of ${maintenanceRequest.description} has been rejected.`
        );

        navigate(-1);
      } else {
        setError('Failed to reject maintenance request');
      }
    } catch (error) {
      console.error('Error rejecting maintenance request:', error);
      setError('Error rejecting maintenance request');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center py-3">
        <h2 className="h5 mb-0"><a href="#" className="text-muted"></a> Request_ID</h2>
      </div>
      <div className="row">
        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-body">
              <div className="mb-3 d-flex justify-content-between">
                <div>
                  <span className="me-3">Maintenance Request Details</span>
                </div>
              </div>
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <td>
                      <div className="d-flex mb-2">
                        <div className="flex-lg-grow-1 ms-3">
                          <h6 className="small mb-0"> Place</h6>
                        </div>
                      </div>
                    </td>
                    <td className="text-end">{maintenanceRequest.place}</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="d-flex mb-2">
                        <div className="flex-lg-grow-1 ms-3">
                          <h6 className="small mb-0"> Issue Type</h6>
                        </div>
                      </div>
                    </td>
                    <td className="text-end">{maintenanceRequest.issueType}</td>
                  </tr>
                 
                  <tr>
                    <td>
                      <div className="d-flex mb-2">
                        <div className="flex-lg-grow-1 ms-3">
                          <h6 className="small mb-0"> Priority</h6>
                        </div>
                      </div>
                    </td>
                    <td className="text-end">{maintenanceRequest.priority}</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="d-flex mb-2">
                        <div className="flex-lg-grow-1 ms-3">
                          <h6 className="small mb-0"> Status</h6>
                        </div>
                      </div>
                    </td>
                    <td className="text-end">{maintenanceRequest.status}</td>
                  </tr>
                  {maintenanceRequest.image && (
                    <tr>
                      <td>
                        <div className="d-flex mb-2">
                          <div className="flex-lg-grow-1 ms-3">
                            <h6 className="small mb-0"> Image</h6>
                          </div>
                        </div>
                      </td>
                      <td  className="text-end">
                        <img 
                          src={maintenanceRequest.image} // Use the image URL directly
                          alt="Maintenance Request"
                          style={{ maxWidth: '100%', maxHeight: 'auto' }}
                        />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card mb-4">
            <div className="card-body">
              <h3 className="h6">Description</h3>
              <p>{maintenanceRequest.description}</p>
            </div>
          </div>

          <button onClick={handleApprove} type="button" className="btn btn-secondary btn-sm">Approve</button>
          <button onClick={handleReject} type="button" className="btn btn-secondary btn-sm" style={{ marginLeft: '10px' }}>Reject</button>

          {error && <p className="text-danger mt-3">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default MaintenanceRequestDetail;
