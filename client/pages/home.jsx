import React from 'react';
import MobileLogo from '../components/mobile-logo';
import ProfileCard from '../components/profile-card';
import MobileNavbar from '../components/mobile-navbar';

export default function Home(props) {
  return (
    <div>
      <MobileLogo />
      <ProfileCard />
      <MobileNavbar />
    </div>
  );
}
