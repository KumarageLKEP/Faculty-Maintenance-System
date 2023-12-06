import React, { useState } from "react";
import { toast } from 'react-toastify';

export const Register = (props) => {
  const [email, setEmail] = useState('');
  const [register, setRegister] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [department, setDepartment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (pass !== confirmPass) {
      alert("Passwords do not match");
      return;
    }



    // Assuming you have a success response from your registration logic
    const res = { data: { success: true } };

    if (res.data.success) {
      toast.success('Registration Successful');
      // Redirect to login page after successful registration
      props.onFormSwitch('login');
    } else {
      toast.error('Registration Failed. Please check your information.');
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
        
        <label htmlFor="password">Password</label>
        <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
        
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} type="password" placeholder="********" id="confirmPassword" name="confirmPassword" />
        <button type="submit"><a href="/">Register</a></button>
      </form>
      <button className="link-btn" >
      <a href="/">Already have an account? Login here.</a>
      </button>
    </div>
  );
};
