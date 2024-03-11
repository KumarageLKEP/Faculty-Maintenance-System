import React from 'react'
import Classes from '../Footer/footer.module.css'



export default function Footer() {
    return (
        <div className={Classes.footer_container}>
          <div className={Classes.footer_section}>
            <h4>Contact Us</h4>
            <p>Email: webmaster@eng.ruh.ac.lk</p>
            <p>Phone: +(94)0 91 2245765/6 </p>
          </div>
    
          <div className={Classes.footer_section}>
            <h4>Follow Us On</h4>
            <p>Facebook</p>
            <p>Twitter</p>
            <p>Instagram</p>
          </div>
    
          <div className={Classes.footer_section}>
            <h4>Help</h4>
            <p>FAQs</p>
            <p>Customer Support</p>
            <p>Terms and Conditions</p>
          </div>
    
          <div className={Classes.footer_section}>
            <h4>About Us</h4>
            <p>The Faculty of Engineering of University
of Ruhuna was established on 1st July 1999 at
Hapugala, Galle. Admission to the Faculty 
of Engineering, University of Ruhuna, is 
subject to the University Grants Commission policy
on university  admissions.
</p>
          </div>
        </div>
      );
    };
    
