import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StudentNotifications({ userId }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/notifications/${userId}`);
        // Assuming notifications are returned in response.data
        if (response.data && response.data.notifications) {
          setNotifications(response.data.notifications);
        } else {
          setError('No notifications found');
        }
      } catch (error) {
        setError(error.response?.data?.message || 'Error fetching notifications');
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [userId]);

  useEffect(() => {
    console.log('Notifications:', notifications);
  }, [notifications]);

  return (
    <div>
      <h2>Notifications</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : notifications && notifications.length > 0 ? (
        <ul>
          {notifications.map((notification, index) => (
            <li key={index}>{notification.message}</li>
          ))}
        </ul>
      ) : (
        <p>No notifications to display</p>
      )}
    </div>
  );
}

export default StudentNotifications;
