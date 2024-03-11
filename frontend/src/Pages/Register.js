import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Classes from '../Pages/register.module.css';

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

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Check if the input is the role input
    if (name === 'role') {
      setFormData({ ...formData, role: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  useEffect(() => {
    // Auto-assign role logic remains the same
    if (formData.regNo.startsWith('EG')) {
      setFormData({ ...formData, role: 'Student' });
    } else if (formData.regNo.startsWith('AC')) {
      setFormData({ ...formData, role: 'Academic Staff' });
    } else if (formData.regNo.startsWith('AD')) {
      setFormData({ ...formData, role: 'Admin' });
    } else if (formData.regNo.startsWith('MD')) {
      setFormData({ ...formData, role: 'Maintenance Division' });
    } else {
      setFormData({ ...formData, role: '' });
    }
  }, [formData.regNo]);

  const onSubmit = (e) => {
    e.preventDefault();

    const { fullName, email, regNo, role, department, contactNumber, password, confirmPassword } = formData;

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

    axios.post('http://localhost:8000/register/user', data)
      .then((res) => {
        if (res.data.success) {
          alert('User Created Successfully');
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
        }
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });
  };

  return (
    <div className={Classes.main_container}>
          <div className={Classes.auth_form_container}>
      <h2>Sign Up now</h2>
      <form className="register-form">
        <label htmlFor="name" className={Classes.text_signup}>Full name</label>
        <input value={formData.fullName} className={Classes.con} name="fullName" onChange={handleInputChange} placeholder="Full Name" type="text"/>

        <label htmlFor="email" className={Classes.text_signup}>Email</label>
        <input value={formData.email} className={Classes.con} onChange={handleInputChange} type="text" placeholder="Email"  name="email" />

        <label htmlFor="regNo"className={Classes.text_signup}>Register No.</label>
        <input value={formData.regNo} className={Classes.con} onChange={handleInputChange} type="text" placeholder="Register No." name="regNo" />

        <label htmlFor="role"className={Classes.text_signup}>Role</label>
        <input
          value={formData.role}
          className={Classes.con}
          onChange={handleInputChange}
          placeholder="Role"
          type="text"
          id="role"
          name="role"
        />

        <label htmlFor="department"className={Classes.text_signup}>Department</label>
        <select value={formData.department} onChange={handleInputChange}  className={Classes.con} name="department">
          <option value="" className={Classes.department} >Select Department</option>
          <option value="Electrical and Information Department" className={Classes.department}>Electrical and Information Department</option>
          <option value="Civil and Environmental Department" className={Classes.department}> Civil and Environmental Department</option>
          <option value="Mechanical and Manufacturing Department" className={Classes.department}>Mechanical and Manufacturing Department</option>
          <option value="Marine and Naval Architecture" className={Classes.department}>Marine and Naval Architecture</option>
          <option value="Interdisciplinary Studies" className={Classes.department}>Interdisciplinary Studies</option>
          <option value="Maintenance Division" className={Classes.department}>Maintenance Division</option>
          <option value="Admin Sector"className={Classes.department}>Admin Sector</option>
        </select>

        <label htmlFor="contactNumber" className={Classes.text_signup}>Contact No.</label>
        <input value={formData.contactNumber} className={Classes.con} onChange={handleInputChange} type="text" placeholder="07********" name="contactNumber" />

        <label htmlFor="password" className={Classes.text_signup}>Password</label>
        <input value={formData.password}className={Classes.con} onChange={handleInputChange} type="text" placeholder="********"  name="password" />

        <label htmlFor="confirmPassword" className={Classes.text_signup}>Confirm Password</label>
        <input value={formData.confirmPassword}className={Classes.con} onChange={handleInputChange} type="text" placeholder="********"  name="confirmPassword" />

        <button
            
            className={Classes.btn_success}
            type="submit"
        
            onClick={onSubmit}
          >
           <p className={Classes.text_signupnow}>Sign Up</p>
          </button>

      </form>


    </div>
    <img src='/images/login_new.jpg' alt='login Background' className={Classes.imageClass2} />
    </div>

  );
}

export default Register;
