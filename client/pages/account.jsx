import React from 'react';
import AppContext from '../lib/app-context';

export default class Account extends React.Component {
  render() {
    const { user, handleSignOut } = this.context;
    return (
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <h1 className='page-title mt-0 mb-0'>Account</h1>
          </div>
        </div>
        <div className='row align-items-center'>
          <div className='col-9'>
            <h2 className='account-text ps-3 mb-0'>{user ? user.name : ''}</h2>
            <h2 className='account-text ps-3 mb-0'>{user ? user.email : ''}</h2>
          </div>
          <div className='col-3 ps-0'>
            <button id='sign-out-mobile' onClick={handleSignOut}>Sign Out</button>
          </div>
        </div>
      </div>
    );
  }
}

Account.contextType = AppContext;
