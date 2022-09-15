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
      .then(data => {
        const doggo = data[0].animal;
        const organization = data[1].organization;
        const photos = doggo.photos.map(x => x.full);
        photos.length > 0 ? this.setState({ photos }) : this.setState({ photos: ['/images/woofles-placeholder.png'] });
        const breeds = doggo.breeds;
        const primaryBreed = breeds.primary;
        breeds.mixed ? this.setState({ breed: primaryBreed + ' (mix)' }) : this.setState({ breed: primaryBreed });
        const tags = doggo.tags;
        const characteristics = tags
          .map(x => x[0].toUpperCase() + x.slice(1))
          .join(', ');
        const attributes = Object
          .keys(doggo.attributes)
          .filter(x => doggo.attributes[x] === true);
        const health = attributes
          .map(x => x.replace('spayed_neutered', 'Spayed/Neutered'))
          .map(x => x.replace('shots_current', 'Vaccinated'))
          .map(x => x.replace('house_trained', 'House Trained'))
          .map(x => x.replace('special_needs', 'Special Needs'))
          .map(x => x[0].toUpperCase() + x.slice(1))
          .join(', ');
        const environment = Object
          .keys(doggo.environment)
          .filter(x => doggo.environment[x] === true);
        const home = environment
          .map(x => x.replace('dogs', 'other dogs'))
          .map(x => x.replace('cats', 'other cats'))
          .map(x => x[0].toUpperCase() + x.slice(1))
          .join(', ');
        const { name, distance, description, age, gender, size, url } = doggo;
        const { name: org, email, phone } = organization;
        const contact = organization.address;
        const address1 = organization.address.address1;
        const address2 = `${contact.city}, ${contact.state} ${contact.postcode}`;
        const location = `${contact.city}, ${contact.state}`;
        this.setState({
          name,
          distance,
          description,
          location,
          age,
          gender,
          size,
          url,
          characteristics,
          health,
          home,
          org,
          address1,
          address2,
          email,
          phone
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
          <ProfileCard data={this.state} />
        </div>
        <ProfileDetail data={this.state} />
        <MobileNavbar />
      </div>
    );
  }

}
