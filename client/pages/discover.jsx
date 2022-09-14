import React from 'react';
import LogoNavbar from '../components/logo-navbar';
import ProfileCard from '../components/profile-card';
import ProfileDetail from '../components/profile-detail';
import MobileNavbar from '../components/mobile-navbar';

export default class Discover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: ['/images/woofles-placeholder.png'],
      name: null,
      breed: null,
      distance: null
    };
  }

  componentDidMount() {
    fetch('/api/discover', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(result => {
        const doggo = result.animals[0];
        const photos = doggo.photos.map(x => x.full);
        const name = doggo.name;
        const breed = doggo.breeds.primary;
        const distance = doggo.distance;
        photos.length > 0 ? this.setState({ photos }) : this.setState({ photos: ['/images/woofles-placeholder.png'] });
        this.setState({
          name,
          breed,
          distance
        });
      })
      .catch(err => console.error('Fetch failed at ProfileCard componentDidMount()', err));
  }

  render() {
    return (
      <div>
        <LogoNavbar />
        <div className='container'>
          <div className='row'>
            <h1 className='page-title mt-0 mb-0'>Henlo Fren</h1>
          </div>
          <ProfileCard doggo={this.state} />
          <ProfileDetail doggo={this.state} />
        </div>
        <MobileNavbar />
      </div>
    );
  }

}
