import React from 'react';

export default class Favorites extends React.Component {
  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <h1 className='page-title mt-0 mb-0'>Goodest Doggos</h1>
          </div>
        </div>
        <div className='row justify-content-center'>
          <div className='col col-md-6'>
            <div className='list-group'>
              <a href="" className='d-flex align-items-center list-group-item list-group-item-action'>
                <div className='circle-img-container'>
                  <img src="/images/woofles-placeholder.png" className='favorites-img' alt="" />
                </div>
                <div className='ps-4'>
                  <h1 className='favorites-name mb-0'>Name</h1>
                  <p className='favorites-text mb-0'>xxx miles away</p>
                </div>
              </a>
              <a href="" className='d-flex align-items-center list-group-item list-group-item-action'>
                <div className='circle-img-container'>
                  <img src="/images/woofles-placeholder.png" className='favorites-img' alt="" />
                </div>
                <div className='ps-4'>
                  <h1 className='favorites-name mb-0'>Name</h1>
                  <p className='favorites-text mb-0'>xxx miles away</p>
                </div>
              </a>
              <a href="" className='d-flex align-items-center list-group-item list-group-item-action'>
                <div className='circle-img-container'>
                  <img src="/images/woofles-placeholder.png" className='favorites-img' alt="" />
                </div>
                <div className='ps-4'>
                  <h1 className='favorites-name mb-0'>Name</h1>
                  <p className='favorites-text mb-0'>xxx miles away</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
