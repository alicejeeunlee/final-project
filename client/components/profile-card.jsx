import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

export default function ProfileCard(props) {
  return (
    <div className='row justify-content-center'>
      <div className='col-sm-9 col-md-7 col-lg-6'>
        <div className='card'>
          <img src="https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/56591696/1/?bust=1659998276&width=560" className='card-img-top' alt="" />
          <div className='card-body'>
            <div className='d-flex align-items-center'>
              <h2 className='card-title mt-0 mb-0'>Nala</h2>
              <i className="fa-solid fa-bone ms-3 me-3"></i>
              <h3 className='card-subtitle mt-0 mb-0'>Golden Retriever</h3>
            </div>
            <h4 className='card-text'>3 miles away</h4>
          </div>
        </div>
        <div id="card-buttons" className='justify-content-between mt-4'>
          <button className='btn btn-outline-danger btn-lg pt-0 pb-0'>NOPE</button>
          <button className='btn btn-outline-success btn-lg pt-0 pb-0'>LOVE</button>
        </div>
      </div>
    </div>
  );
}
