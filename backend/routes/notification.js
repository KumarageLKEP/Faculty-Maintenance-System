const express = require('express');
const router = express.Router();
const Notification = require('../models/notification');

// Route to send a notification
router.post('/sendNotification', async (req, res) => {
  try {
    // Extract necessary information from the request body
    const { userId, message } = req.body;

    // Create a new notification document
    const notification = new Notification({
      userId,
      message
    });

    // Save the notification to the database
    await notification.save();

    // Respond with a success message
    res.status(201).json({ success: true, message: 'Notification sent successfully' });
  } catch (error) {
    // Handle errors
    console.error('Error sending notification:', error);
    res.status(500).json({ success: false, message: 'Failed to send notification' });
  }
});

router.get('/notifications/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      // Find notifications for the specified user ID
      const notifications = await Notification.find({userId });
      if (!notifications) {
        return res.status(404).json({ success: false, message: 'Notifications not found' });
      }
  
      return res.status(200).json({ success: true, notifications});
    } catch (error) {
      console.error('Error fetching notifications:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/notifications', async (req, res) => {
    try {
      const notifications = await Notification.find().exec();
      res.status(200).json({ success: true, existingNotifications: notifications });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

module.exports = router;
