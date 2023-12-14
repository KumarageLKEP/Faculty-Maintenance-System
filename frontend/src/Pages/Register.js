import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    regNo: '',
    role: '',
    department: '',
    contactNumber: '',
    password: '',
    confirmPassword: '',
  });

  const [role, setRole] = useState(''); // Added state for role
  const [department, setDepartment] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (formData.regNo.startsWith('EG')) {
      setRole('Student');
    } else if (formData.regNo.startsWith('AC')) {
      setRole('Academic Staff');
    } else if (formData.regNo.startsWith('AD')) {
      setRole('Admin');
    } else {
      setRole('Maintenance Division');
    }
  }, [formData.regNo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const {
      fullName,
      email,
      regNo,
      role,
      department,
      contactNumber,
      password,
      confirmPassword,
    } = formData;

    const data = {
      fullName,
      email,
      regNo,
      role,
      department,
      contactNumber,
      password,
      confirmPassword,
    };

    axios.post('http://localhost:8000/register/user', data).then((res) => {
      if (res.data.success) {
        toast.success('User Created Successfully');
        setFormData({
          fullName: '',
          email: '',
          regNo: '',
          role: '',
          department: '',
          contactNumber: '',
          password: '',
          confirmPassword: '',
        });

        navigate('/');
      } else {
        toast.error('User Creation Failed. Please check your information.');
      }
    });
  };

  return (
    <div className="auth-form-container">
      <h2>Register</h2>
      <form className="register-form">
        <label htmlFor="name">Full name</label>
        <input
          value={formData.fullName}
          name="fullName"
          onChange={handleInputChange}
          placeholder="Full Name"
          type="text"
        />

        <label htmlFor="email">Email</label>
        <input
          value={formData.email}
          onChange={handleInputChange}
          type="text"
          name="email"
        />

        <label htmlFor="regNo">Register No.</label>
        <input
          value={formData.regNo}
          onChange={handleInputChange}
          type="text"
          placeholder="EG/____/____"
          name="regNo"
        />

        <label htmlFor="role">Role</label>
        <input
          value={role}
          onChange={(e) => setRole(e.target.value)}
          type="text"
          id="role"
          name="role"
          disabled
        />

        <label htmlFor="department">Department</label>
        <select
          value={formData.department}
          onChange={handleInputChange}
          id="department"
          name="department"
        >
          
          <option value="">Select Department</option>
          <option value="Electrical and Information Department">Electrical and Information Department</option>
          <option value="Civil and Environmental Department">Civil and Environmental Department</option>
          <option value="Mechanical and Manufacturing Department">Mechanical and Manufacturing Department</option>
          <option value="Marine and Naval Architecture">Marine and Naval Architecture</option>
          <option value="Interdisciplinary Studies">Interdisciplinary Studies</option>
          <option value="Maintenance Division">Maintenance Division</option>
          <option value="Admin Sector">Admin Sector</option>
        </select>

        <label htmlFor="contactNumber">Contact No.</label>
        <input
          value={formData.contactNumber}
          onChange={handleInputChange}
          type="text"
          placeholder="07********"
          name="contactNumber"
        />

        <label htmlFor="password">Password</label>
        <input
          value={formData.password}
          onChange={handleInputChange}
          type="text"
          placeholder="********"
          name="password"
        />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          value={formData.confirmPassword}
          onChange={handleInputChange}
          type="text"
          placeholder="********"
          name="confirmPassword"
        />

        <button className="btn btn-success" type="submit" onClick={onSubmit}>
          <i className="far fa-check-square"></i>&nbsp; Register
        </button>
      </form>
      <button className="link-btn">
        <a href="/">Already have an account? Login here.</a>
      </button>
    </div>
  );
}

export default Register;
