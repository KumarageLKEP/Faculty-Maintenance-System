const mongoose = require('mongoose');

const maintenanceRequestSchema = new mongoose.Schema({
  place: {
    type: String,
    required: true,
  },
  issueType: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Assuming you store the image URL
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the user who submitted the request
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const MaintenanceRequest = mongoose.model('MaintenanceRequest', maintenanceRequestSchema);

module.exports = MaintenanceRequest;
