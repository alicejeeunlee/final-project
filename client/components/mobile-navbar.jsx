import React from 'react';
import AppContext from '../lib/app-context';

export default class MobileNavbar extends React.Component {
  render() {
    const { user } = this.context;
    return (
      <nav id='mobile-navbar' className='navbar fixed-bottom'>
        <div className='container-fluid justify-content-around'>
          <a href={ user ? '#discover' : ''}><i className='fa-solid fa-paw mt-2 mb-2'></i></a>
          <a href={ user ? '#favorites' : ''}><i className='fa-solid fa-heart mt-2 mb-2'></i></a>
          <a href={ user ? '#account' : ''}><i className='fa-solid fa-user mt-2 mb-2'></i></a>
        </div>
      </nav>
    );
  }
}

MobileNavbar.contextType = AppContext;
