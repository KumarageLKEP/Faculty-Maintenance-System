const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose'); // Import mongoose
const app = express();

const MaintenanceRequest = require('../models/maintenanceRequest');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
}).single('image');

router.post('/maintenanceRequest', (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error uploading file' });
    }

    try {
      const { place, issueType, priority, description } = req.body;

      const newMaintenanceRequest = new MaintenanceRequest({
        place,
        issueType,
        priority,
        image: req.file.path, // Save the file path in the database
        description,
        submittedBy: req.body.submittedBy, // Add submittedBy field
      });

      const savedMaintenanceRequest = await newMaintenanceRequest.save();

      res.json({ success: 'Maintenance Request Created Successfully', newMaintenanceRequest: savedMaintenanceRequest });
    } catch (error) {
      res.status(400).json({ message: 'Maintenance Request creation unsuccessful', error: error.message });
    }
  });
});






// Get all maintenance requests
router.get('/maintenanceRequests', async (req, res) => {
  try {
    const maintenanceRequests = await MaintenanceRequest.find().exec();
    res.status(200).json({ success: true, existingMaintenanceRequests: maintenanceRequests });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific maintenance request

router.get('/maintenanceRequest/:id', async (req, res) => {
  try {
    const requestId = req.params.id;
    const maintenanceRequest = await MaintenanceRequest.findById(requestId);

    if (!maintenanceRequest) {
      return res.status(404).json({ success: false, message: 'Maintenance Request not found' });
    }

    // Convert the Buffer to a base64-encoded string
    const imageBase64 = maintenanceRequest.image.toString('base64');

    // Create a new object with the image property set to the base64 string
    const maintenanceRequestWithBase64Image = {
      ...maintenanceRequest.toObject(),
      image: imageBase64,
    };

    return res.status(200).json({ success: true, maintenanceRequest: maintenanceRequestWithBase64Image });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Get all maintenance requests for a specific user
router.get('/maintenanceRequests/:submittedBy', async (req, res) => {
  try {
    const submittedBy = req.params.submittedBy;
    const maintenanceRequests = await MaintenanceRequest.find({ submittedBy }).exec();
    res.status(200).json({ success: true, existingMaintenanceRequests: maintenanceRequests });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Update a maintenance request
router.put('/maintenanceRequest/update/:id', async (req, res) => {
  try {
    await MaintenanceRequest.findByIdAndUpdate(req.params.id, { $set: req.body }).exec();
    res.status(200).json({ success: 'Maintenance Request Updated Successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a maintenance request
router.delete('/maintenanceRequest/delete/:id', async (req, res) => {
  try {
    const deleteMaintenanceRequest = await MaintenanceRequest.findByIdAndRemove(req.params.id).exec();
    if (!deleteMaintenanceRequest) {
      return res.status(404).json({ message: 'Maintenance Request not found' });
    }
    res.json({ message: 'Delete Successful', deleteMaintenanceRequest });
  } catch (error) {
    res.status(400).json({ message: 'Delete unsuccessful', error: error.message });
  }
});

router.post('/maintenanceRequest/save', async (req, res) => {
  try {
    const newMaintenanceRequest = new MaintenanceRequest(req.body);

    const savedMaintenanceRequest = await newMaintenanceRequest.save();

    res.json({ message: 'Maintenance Request Created Successfully', newMaintenanceRequest: savedMaintenanceRequest });
  } catch (error) {
    res.status(400).json({ message: 'Maintenance Request creation unsuccessful', error: error.message });
  }
});

module.exports = router;
