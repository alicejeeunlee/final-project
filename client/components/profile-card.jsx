import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

export default class ProfileCard extends React.Component {
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
      <div className='row justify-content-center'>
        <div className='col-sm-9 col-md-7 col-lg-6'>
          <a href="#details">
            <div className='card'>
              <img src={this.state.photos[0]} className='card-img-top' alt="" />
              <div className='card-body'>
                <div className='d-flex align-items-center'>
                  <h2 className='card-title mt-0 mb-0'>{this.state.name}</h2>
                  <i className="fa-solid fa-bone ms-3 me-3"></i>
                  <h3 className='card-subtitle mt-0 mb-0'>{this.state.breed}</h3>
                </div>
                <h4 className='card-text'>{this.state.location}</h4>
              </div>
            </div>
          </a>
          <div id="card-buttons" className='justify-content-between mt-4'>
            <button className='btn btn-outline-danger btn-lg pt-0 pb-0'>NOPE</button>
            <button className='btn btn-outline-success btn-lg pt-0 pb-0'>LOVE</button>
          </div>
        </div>
      </div>
    );
  }
}
