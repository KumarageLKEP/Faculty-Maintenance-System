import React, { useState } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Classes from '../Pages/addrequest.module.css';

function AddRequest() {
  const { Id } = useParams();
  const navigate = useNavigate();
  console.log('User ID:', Id);

  const [formData, setFormData] = useState({
    place: '',
    issueType: '',
    priority: '',
    image: null,
    description: '',
    submittedBy: Id,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const { place, issueType, priority, image, description, submittedBy } = formData;

    const data = new FormData();
    data.append('place', place);
    data.append('issueType', issueType);
    data.append('priority', priority);
    data.append('image', image);
    data.append('description', description);
    data.append('submittedBy', submittedBy);

    try {
      const response = await axios.post('http://localhost:8000/maintenanceRequest', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        toast.success('Request Created Successfully');
        setFormData({
          place: '',
          issueType: '',
          priority: '',
          image: null,
          description: '',
          submittedBy: Id,
        });

        navigate(`/studentPage/${Id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div className={Classes.auth_form_container}>
    <h2 className={Classes.auth_form_container_text}>Maintenance Request Form</h2>
    <div className={Classes.main_maincontainer}>
         
    <div className={Classes.mini_container}>
      <form className="register-form" encType="multipart/form-data">
        <label htmlFor="place"  className={Classes.request_text}>Place</label>
        <select value={formData.place} onChange={handleInputChange}  className={Classes.request_container} name="place">
          <option value="">Select Place</option>
          <option value="Electrical and Information Department">Electrical and Information Department</option>
          <option value="Civil and Environmental Department">Civil and Environmental Department</option>
          <option value="Mechanical and Manufacturing Department">Mechanical and Manufacturing Department</option>
          <option value="Marine and Naval Architecture">Marine and Naval Architecture</option>
          <option value="Interdisciplinary Studies">Interdisciplinary Studies</option>
          <option value="Maintenance Division">Maintenance Division</option>
          <option value="Admin Sector">Admin Sector</option>
        </select>

        <label htmlFor="issueType"  className={Classes.request_text}>Issue Type</label>
        <select value={formData.issueType} onChange={handleInputChange} className={Classes.request_container} name="issueType">
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

        <label htmlFor="priority"  className={Classes.request_text}>Priority</label>
        <select value={formData.priority} onChange={handleInputChange}className={Classes.request_container} name="priority">
          <option value=""  >Select Priority</option>
          <option value="High">High</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
        </select>

        <label htmlFor="image"  className={Classes.request_text}> Image</label>
        <input type="file" accept="image/*" onChange={handleImageChange} className={Classes.request_container} name="image" />

        <label htmlFor="description"  className={Classes.request_text}>Description</label>
        <input value={formData.description} onChange={handleInputChange} className={Classes.request_container} type="text" name="description" />

        <button className={Classes.button_request} type="submit" onClick={onSubmit}>
          <i className="far fa-check-square"></i>&nbsp; Register
        </button>
        <img src='/images/maintainance_2.jpg' alt='request Background' className={Classes.imageClass3} />
      </form>
    </div>
    </div>
    <img src='/images/maintainance_2.jpg' alt='login Background' className={Classes.imageClass2} />
    </div>


  );
}

export default AddRequest;
