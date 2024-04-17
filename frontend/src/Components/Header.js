import React from 'react'
import classes from '../Components/header.module.css'
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className={classes.header}>
          <div className={classes.container}>

          <img src='/images/logo.jpeg' alt='login Background' className={classes.imageClass3} />


            <p className={classes.FMMS}>
              ENG FMMS
            </p>
    
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

          
        </header>
    
    
        
      );
    }