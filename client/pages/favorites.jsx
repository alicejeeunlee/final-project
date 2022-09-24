import React from 'react';

export default class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likedDogs: null
    };
    this.getLikedDogs = this.getLikedDogs.bind(this);
    this.makeListItem = this.makeListItem.bind(this);
  }

  getLikedDogs() {
    return fetch('/api/favorites', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': window.localStorage.getItem('woofles-jwt')
      }
    })
      .then(res => res.json())
      .then(likedDogs => this.setState({
        likedDogs
      }));
  }

  makeListItem() {
    return this.state.likedDogs.map((doggo, index) => {
      return (
        <a href="favorites" key={index} className='d-flex pt-3 pb-3 align-items-center list-group-item list-group-item-action'>
          <div className='circle-img-container'>
            <img src="/images/woofles-placeholder.png" className='favorites-img' alt="" />
          </div>
          <div className='ps-4'>
            <h1 className='favorites-name mb-0'>{doggo.name}</h1>
            <p className={doggo.distance ? 'favorites-text mb-0' : 'd-none'}>{Math.round(doggo.distance)} miles away</p>
          </div>
        </a>
      );
    });
  }

  componentDidMount() {
    this.getLikedDogs();
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <h1 className='page-title mt-0 mb-0'>Goodest Doggos</h1>
          </div>
        </div>
        <div className='row justify-content-center'>
          <div className='col col-md-6'>
            <div className='list-group'>
              {this.state.likedDogs === null ? null : this.makeListItem()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
