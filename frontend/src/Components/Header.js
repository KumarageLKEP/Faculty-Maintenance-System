import React from 'react'
import classes from '../Components/header.module.css'
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
    return (
        <header className={classes.header}>
          <div className={classes.container}>
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
            
    
           
          </div>

          <button type="submit" className={classes.button_login} > <p className={classes.login_text_2}>Login</p></button>
        </header>
    
    
        
      );
    }