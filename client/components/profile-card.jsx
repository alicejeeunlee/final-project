import React from 'react';

export default class ProfileCard extends React.Component {
  render() {
    return (
      <div className='row justify-content-center'>
        <div className='col-sm-9 col-md-7 col-lg-6'>
          <a href="#details">
            <div className='card'>
              <img src={this.props.doggo.photos[0]} className='card-img-top' alt="" />
              <div className='card-body'>
                <div className='d-flex align-items-center'>
                  <h2 className='card-title mt-0 mb-0'>{this.props.doggo.name}</h2>
                  <i className="fa-solid fa-bone ms-3 me-3"></i>
                  <h3 className='card-subtitle mt-0 mb-0'>{this.props.doggo.breed}</h3>
                </div>
                <h4 className='card-text'>{this.props.doggo.distance}</h4>
              </div>
            </div>
          </a>
          <div id="card-buttons" className='justify-content-between mt-4'>
            <button className='btn btn-outline-danger btn-lg pt-0 pb-0'>NOPE</button>
            <button className='btn btn-outline-success btn-lg pt-0 pb-0'>LOVE</button>
          </div>
        </div>
      </div>
    );
  }
}
