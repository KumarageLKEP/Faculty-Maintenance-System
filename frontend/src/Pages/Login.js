import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login(){

    const navigate = useNavigate();
    const [regNo, setRegNo] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (user) => {
        const { role} = user;
    
        switch (role) {
          case 'Student':
            navigate('/studentPage');
            break;
          case 'Admin':
            navigate('adminPage');
            break;
          case 'Academic Staff':
            navigate('/academicStaffPage');
            break;
          case 'Maintenance Division':
            navigate('/maintenanceDivisionPage');
            break;
          default:
            console.error('Unknown role:', role);
            break;
        }
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.get('http://localhost:8000/users'); 
          if (response.data.success) {
            const user = response.data.existingUsers.find(
              (user) => user.regNo === regNo && user.password === password
            );
    
            if (user) {
              handleLogin(user);
            } else {
              console.error('Authentication failed');
            }
          } else {
            console.error('Failed to fetch posts');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
    
      const handleCancel = () => {
        navigate('/'); 
      };

    
    return (
        <h2> Faculty Maintenance Management System (FMMS)
        <div className="auth-form-container">
           
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="register">Register No.</label>
                <input value={regNo} onChange={(e) => setRegNo(e.target.value)}type="regNo" placeholder="EG/____/____" id="regNo" name="regNo" />
                <label htmlFor="password">password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button type="submit"> <a href="/dashboard">Login</a></button>
            </form>
            <button className="link-btn" ><a href="/register">Don't have an account? Register here.</a></button>
        </div>
        </h2>
    );
}

export default Login;
