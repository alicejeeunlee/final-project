import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

export default function MobileLogo(props) {
  return (
    <nav className='navbar fixed-top'>
      <div className='container-fluid justify-content-center'>
        <i className="fa-solid fa-stroopwafel"></i>
        <a className='navbar-brand ms-4 me-4 pt-0 pb-0' href="#">Woofles</a>
        <i className="fa-solid fa-stroopwafel"></i>
      </div>
    </nav>
  );
}
