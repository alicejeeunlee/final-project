import React from 'react';

export default function MobileNavbar(props) {
  return (
    <nav id='mobile-navbar' className='navbar fixed-bottom'>
      <div className='container-fluid justify-content-evenly'>
        <a href='#discover'><i className="fa-solid fa-paw mt-2 mb-2"></i></a>
        <a href='#favorites'><i className="fa-solid fa-heart mt-2 mb-2"></i></a>
        <a href='#inquires'><i className="fa-solid fa-user mt-2 mb-2"></i></a>
      </div>
    </nav>
  );
}
