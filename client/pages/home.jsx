import React from 'react';
import LogoNavbar from '../components/logo-navbar';
import ProfileCard from '../components/profile-card';
import MobileNavbar from '../components/mobile-navbar';

export default function Home(props) {
  return (
    <div>
      <LogoNavbar />
      <div className='container'>
        <div className='row'>
          <h1 className='page-title mt-0 mb-0'>Henlo Fren</h1>
        </div>
        <ProfileCard />
      </div>
      <MobileNavbar />
    </div>
  );
}
