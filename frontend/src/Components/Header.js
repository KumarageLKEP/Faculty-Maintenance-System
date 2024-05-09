import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import classes from './header.module.css'; // Corrected CSS module file name


export default function Header() {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img src="/images/logo.jpeg" alt="ENG FMMS Logo" width="30" height="24" className="d-inline-block align-text-top" />
          <span style={{ marginLeft: '20px', fontSize: '25px' , fontWeight:'bolder' }} className="FMMS">ENG FMMS</span>
        </a>
      
        <div className={classes.header}>
          <div className={classes.container}>
            
            <Link to="/Home" className={classes.Home}>
              HOME
            </Link>
            <Link to="/About Us" className={classes.About_Us}>
              ABOUT US
            </Link>
            <Link to="/Dashboard" className={classes.Dashboard}>
              DASHBOARD
            </Link>
            <Link to="/" className={classes.Dashboard}>
              LOGIN
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
