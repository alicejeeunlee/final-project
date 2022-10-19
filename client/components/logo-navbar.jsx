import React from 'react';
import AppContext from '../lib/app-context';

export default class LogoNavbar extends React.Component {
  render() {
    const { user, route, handleSignOut } = this.context;
    let navAnchor;
    if (route.path === 'sign-up' || route.path === 'sign-in' || route.path === '') {
      navAnchor = 'd-none';
    } else {
      navAnchor = '';
    }
    return (
      <nav className='navbar fixed-top'>
        <div className='container-fluid justify-content-center justify-content-md-start'>
          <i className='fa-solid fa-stroopwafel mt-0 mb-0 ms-3'></i>
          <h1 className='navbar-brand ms-4 me-4  mt-0 mb-0 pt-0 pb-0'>Woofles</h1>
          <i className='fa-solid fa-stroopwafel mt-0 mb-0  me-3'></i>
          <div id='desktop-nav' className={navAnchor}>
            <a href='#discover' className='anchor ms-5'>Discover</a>
            <a href='#favorites' className='anchor'>Favorites</a>
          </div>
            { user !== null &&
              <button id='sign-out-btn' type='button' className='btn btn-light ms-auto me-3' onClick={handleSignOut}>
                Sign Out
                <i className='fa-solid fa-right-from-bracket ms-2'></i>
              </button>
            }
        </div>
      </nav>
    );
  }
}

LogoNavbar.contextType = AppContext;
