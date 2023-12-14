import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Login = (props) => {
    const [register, setRegister] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (user) => {
        const { role} = user;
    
        switch (role) {
          case 'Student':
            navigate('/StudentPage');
            break;
          case 'Admin':
            navigate('/AdminPage');
            break;
          case 'Academic Staff':
            navigate('/AcademicStaffPage');
            break;
          case 'Maintenance Division':
            navigate('/MaintenanceDivisionPage');
            break;
          default:
            console.error('Unknown role:', role);
            break;
        }
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        
        
    }

    
    return (
        <h2> Faculty Maintenance Management System (FMMS)
        <div className="auth-form-container">
           
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="register">Register No.</label>
                <input value={register} onChange={(e) => setRegister(e.target.value)}type="register" placeholder="EG/____/____" id="register" name="register" />
                <label htmlFor="password">password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button type="submit"> <a href="/dashboard">Login</a></button>
            </form>
            <button className="link-btn" ><a href="/register">Don't have an account? Register here.</a></button>
        </div>
        </h2>
    )
}
