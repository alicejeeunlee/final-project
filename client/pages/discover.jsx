import React from 'react';
import LogoNavbar from '../components/logo-navbar';
import ProfileCard from '../components/profile-card';
import ProfileDetail from '../components/profile-detail';
import MobileNavbar from '../components/mobile-navbar';

export default class Discover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: ['/images/woofles-placeholder.png']
      // name: null,
      // breeds: null,
      // distance: null,
      // description: null,
      // contact: null,
      // age: null,
      // gender: null,
      // size: null,
      // url: null
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
      .then(data => data)
    // const doggo = result.animals[0];
    // const photos = doggo.photos.map(x => x.full);
    // const breed = doggo.breeds.primary;
    // const location = doggo.contact.address.city + ', ' + doggo.contact.address.state;
    // const address = doggo.contact.address.address;
    // const { name, distance, description, age, gender, size, url } = doggo;
    // photos.length > 0 ? this.setState({ photos }) : this.setState({ photos: ['/images/woofles-placeholder.png'] });
    // this.setState({
    //   name,
    //   breed,
    //   location,
    //   distance,
    //   description,
    //   age,
    //   gender,
    //   size,
    //   address,
    //   url
    // });
      // })
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
        </div>
        <ProfileDetail doggo={this.state} />
        <MobileNavbar />
      </div>
    );
  }

}
