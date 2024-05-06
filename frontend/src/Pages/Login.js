import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import classes from '../Pages/login.module.css';

function Login(){

    const navigate = useNavigate();
    const [regNo, setRegNo] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (user) => {
      const { role, _id: id } = user; // Use _id for MongoDB document ID
    
      switch (role) {
        case 'Student':
          navigate(`/studentPage/${id}`);
          break;
        case 'Admin':
          navigate(`/adminPage/${id}`);
          break;
        case 'Academic Staff':
          navigate(`/academicStaffPage/${id}`);
          break;
        case 'Maintenance Division':
          navigate(`/maintenanceDivisionPage/${id}`);
          break;
        default:
          console.error('Unknown role:', role);
          break;
      }
    };
    

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post('http://localhost:8000/login', {
          regNo,
          password,
        });
  
        if (response.data.success) {
          // Authentication successful, handle login (e.g., store token)
          handleLogin(response.data.user);
        } else {
          // Authentication failed, display error message
          console.error('Authentication failed');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    
    return (
      <div className={classes.main}>
              
        <div >
           
            <h2 className={classes.aut_form_container}>Login now</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="register"className={classes.text_1} >User Name</label>
                <input value={regNo} className={classes.container_1} onChange={(e) => setRegNo(e.target.value)} placeholder ="Enter your username" type="regNo" id="regNo" name="regNo" />
                <label htmlFor="password"className={classes.text_2}>password</label>
                <input value={password} className={classes.container_2} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button type="submit" className={classes.button} > <p className={classes.login_text}>Login</p></button>
            </form>
            
            <button className="link-btn">
  <span className={classes.text_3}>Not registered yet? </span>
  <a href="/register" className={classes.text_4}>Create an account SignUp</a>

</button>


        </div>
        <img src='/images/login_new.jpg' alt='login Background' className={classes.imageClass1} />
      </div>
      

    );
}

export default Login;
