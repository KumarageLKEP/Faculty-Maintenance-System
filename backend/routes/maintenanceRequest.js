const express = require('express');
const router = express.Router();
const MaintenanceRequest = require('../models/maintenanceRequest');

// Create a new maintenance request
router.post('/maintenanceRequest', async (req, res) => {
  try {
    const newMaintenanceRequest = new MaintenanceRequest(req.body);
    await newMaintenanceRequest.save();
    res.status(201).json({ success: 'Maintenance Request Created Successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
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

    return res.status(200).json({ success: true, maintenanceRequest });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
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
