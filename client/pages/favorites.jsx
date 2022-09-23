import React from 'react';

export default class Favorites extends React.Component {
  render() {
    return (
      <div className='container'>
        <div className='row'>
          <h1 className='page-title mt-0 mb-0'>Goodest Doggos</h1>
          <div className='list-group'>
            <a href="" className='list-group-item list-group-item-action'>
              <div>
                <img src="" alt="" />
              </div>
              <h1>Name</h1>
              <p>xxx miles away</p>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
