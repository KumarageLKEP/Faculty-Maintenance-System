import React from 'react';

const Footer = () => {
  return (
    <footer className="text-center text-lg-start text-white" style={{backgroundColor: '#929fba', marginTop: 'auto'}}>
      <div className="container p-4 pb-0">
        <section>
          <div className="row">
            <div className="col-md-6 col-lg-3 col-xl-3 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">
                Faculty of Engineering , University of Ruhuna
              </h6>
              <p>
              The Faculty of Engineering of University 
              of Ruhuna was established on 1st July 1999 at Hapugala, Galle.  Admission to the Faculty of Engineering, University of Ruhuna, is subject to the University Grants Commission 
              policy on university admissions.
              </p>
            </div>

            <div className="col-md-6 col-lg-3 col-xl-3 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">Products</h6>
              <p>
                <a className="text-white">University of Ruhuna</a>
              </p>
              <p>
                <a className="text-white">Faculty of Engineering</a>
              </p>
              <p>
                <a className="text-white">ENG-MIS</a>
              </p>
              <p>
                <a className="text-white">Libraryr</a>
              </p>
            </div>

            <div className="col-md-6 col-lg-3 col-xl-3 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
              <p><i className="fas fa-home mr-3"></i> Faculty of Engineering,Galle</p>
              <p><i className="fas fa-envelope mr-3"></i> webmaster@eng.ruh.ac.lk</p>
              <p><i className="fas fa-phone mr-3"></i> +(94)0 91 2245765/6</p>
            </div>

            <div className="col-md-6 col-lg-3 col-xl-3 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">Follow us</h6>
              <a className="btn btn-primary btn-floating m-1" style={{backgroundColor: '#3b5998'}} href="#!" role="button"><i className="fab fa-facebook-f"></i></a>
              <a className="btn btn-primary btn-floating m-1" style={{backgroundColor: '#55acee'}} href="#!" role="button"><i className="fab fa-twitter"></i></a>
              <a className="btn btn-primary btn-floating m-1" style={{backgroundColor: '#dd4b39'}} href="#!" role="button"><i className="fab fa-google"></i></a>
              <a className="btn btn-primary btn-floating m-1" style={{backgroundColor: '#ac2bac'}} href="#!" role="button"><i className="fab fa-instagram"></i></a>
              <a className="btn btn-primary btn-floating m-1" style={{backgroundColor: '#0082ca'}} href="#!" role="button"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </section>
      </div>

      <div className="text-center p-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
        © 2020 Copyright:
        <a className="text-white" href="https://mdbootstrap.com/">MDBootstrap.com</a>
      </div>
    </footer>
  );
}

export default Footer;