import React, { useState } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';

export const Register = (props) => {
  const [email, setEmail] = useState('');
  const [register, setRegister] = useState('');
  const [contact, setContact] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [department, setDepartment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (pass !== confirmPass) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('/user', {
        email,
        register,
        contact,
        pass,
        name,
        role,
        department,
      });

      if (response.data.success) {
        toast.success('Registration Successful');
        props.onFormSwitch('login');
      } else {
        toast.error('Registration Failed. Please check your information.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      toast.error('Registration Failed. Please try again.');
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
      <label htmlFor="name">Full name</label>
        <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="Full Name" />
        
        <label htmlFor="email">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" />
        
        <label htmlFor="register">Register No.</label>
        <input value={register} onChange={(e) => setRegister(e.target.value)} type="text" placeholder="EG/____/____" id="register" name="register" />
        
        <label htmlFor="role">Role</label>
        <select value={role} onChange={(e) => setRole(e.target.value)} id="role" name="role">
          <option value="">Select Role</option>
          <option value="academicStaff">Academic Staff</option>
          <option value="student">Student</option>
          <option value="maintenanceDivision">Maintenance Division</option>
        </select>

        <label htmlFor="department">Department</label>
        <select value={department} onChange={(e) => setDepartment(e.target.value)} id="department" name="department">
          <option value="">Select Department</option>
          <option value="Electrical and Information Department">Electrical and Information Department</option>
          <option value="Civil and Environmental Department">Civil and Environmental Department</option>
          <option value="Mechanical and Manufacturing Department">Mechanical and Manufacturing Department</option>
          <option value="Marine and Naval Architecture">Marine and Naval Architecture</option>
          <option value="Interdisciplinary Studies">Interdisciplinary Studies</option>
        </select>

        <label htmlFor="contact">Contact No.</label>
        <input value={contact} onChange={(e) => setContact(e.target.value)} type="text" placeholder="07********" id="contact" name="contact" />
        
        <label htmlFor="password">Password</label>
        <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
        
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} type="password" placeholder="********" id="confirmPassword" name="confirmPassword" />
        <button type="submit"><a href="/">Register</a></button>
      </form>
      <button className="link-btn" onClick={() => props.onFormSwitch('login')}>
        Already have an account? Login here.
      </button>
    </div>
  );
};
