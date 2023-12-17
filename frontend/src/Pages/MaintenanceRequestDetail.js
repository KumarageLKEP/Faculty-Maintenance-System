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
        if (response.data.success) {
          setMaintenanceRequest(response.data.maintenanceRequest);
        } else {
          setError('Failed to fetch maintenance request');
        }
      } catch (error) {
        setError('Error fetching maintenance request');
      } finally {
        setLoading(false);
      }
    };

    fetchMaintenanceRequest();
  }, [id]);

  return (
    <div>
      <div className="MaintenanceRequestDetail">
        <div className="row">
          <div className="col-lg-9 mt-2 mb-2">
            <h4>Maintenance Request Details</h4>
          </div>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}

        {maintenanceRequest && (
          <table className="table table-success table-striped" style={{ marginTop: '40px' }}>
            <tbody>
              <tr>
                <th scope="row">Place</th>
                <td>{maintenanceRequest.place}</td>
              </tr>
              <tr>
                <th scope="row">Issue Type</th>
                <td>{maintenanceRequest.issueType}</td>
              </tr>
              <tr>
                <th scope="row">Description</th>
                <td>{maintenanceRequest.description}</td>
              </tr>
              {maintenanceRequest.image && maintenanceRequest.image.data && (
                <tr>
                  <th scope="row">Image</th>
                  <td>
                    <img
                      src={`data:image/jpeg;base64,${new Uint8Array(maintenanceRequest.image.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        ''
                      )}`}
                      alt="Maintenance Request"
                      style={{ maxWidth: '100px', maxHeight: '100px' }}
                    />
                  </td>
                </tr>
              )}
              <tr>
                <th scope="row">Priority</th>
                <td>{maintenanceRequest.priority}</td>
              </tr>
              {/* Add more rows for other properties if needed */}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default MaintenanceRequestDetail;
