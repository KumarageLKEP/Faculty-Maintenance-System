import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddRequest() {
  const [formData, setFormData] = useState({
    place: '',
    issueType: '',
    priority: '',
    image: '',
    description: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    
  };

  

  const onSubmit = (e) => {
    e.preventDefault();

    const { place, issueType, priority, image, description } = formData;

    const data = {
      place,
      issueType,
      priority,
      image,
      description,
    };

    axios.post('http://localhost:8000/maintenanceRequest', data)
      .then((res) => {
        if (res.data.success) {
          alert('Request Created Successfully');
          setFormData({
            place: '',
            issueType: '',
            priority: '',
            image: '',
            description: '',
          });

          navigate('/studentPage');
        }
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });
  };

  return (
    <div className="auth-form-container">
      <h2>Maintenance Request</h2>
      <form className="register-form">
      <label htmlFor="department">Place</label>
        <select value={formData.department} onChange={handleInputChange}  name="department">
          <option value="">Select Place</option>
          <option value="Electrical and Information Department">Electrical and Information Department</option>
          <option value="Civil and Environmental Department">Civil and Environmental Department</option>
          <option value="Mechanical and Manufacturing Department">Mechanical and Manufacturing Department</option>
          <option value="Marine and Naval Architecture">Marine and Naval Architecture</option>
          <option value="Interdisciplinary Studies">Interdisciplinary Studies</option>
          <option value="Maintenance Division">Maintenance Division</option>
          <option value="Admin Sector">Admin Sector</option>
        </select>

        <label htmlFor="department">Issue Type</label>
        <select value={formData.department} onChange={handleInputChange}  name="department">
          <option value="">Select Issue Type</option>
          <option value="Electrical">Electrical</option>
          <option value="Plumbing">Plumbing</option>
          <option value="HVAC (Heating, Ventilation, and Air Conditioning)">HVAC (Heating, Ventilation, and Air Conditioning)</option>
          <option value="Appliance">Appliance</option>
          <option value="Structural">Structural</option>
          <option value="Security and Safety">Security and Safety</option>
          <option value="IT and Technology">IT and Technology</option>
          <option value="Grounds Maintenance">Grounds Maintenance</option>
          <option value="Other">Other</option>
        </select>

        <label htmlFor="department">Priority</label>
        <select value={formData.department} onChange={handleInputChange}  name="department">
          <option value="">Select Priority</option>
          <option value="High">High</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
        </select>

        <label htmlFor="contactNumber">Image</label>
        <input value={formData.contactNumber} onChange={handleInputChange} type="text" placeholder="07********" name="contactNumber" />

        <label htmlFor="password">Description</label>
        <input value={formData.password} onChange={handleInputChange} type="text" placeholder="********"  name="password" />

        <button
            className="btn btn-success"
            type="submit"
        
            onClick={onSubmit}
          >
            <i className="far fa-check-square"></i>&nbsp; Register
          </button>
      </form>


    </div>
  );
}

export default AddRequest;
