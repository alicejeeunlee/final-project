import React from 'react';
import AppContext from '../lib/app-context';
import FavoriteDetail from '../components/favorite-detail';

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
      .then(data => {
        const arrayToObject1 = (arr, key) => {
          return arr.reduce((obj, item) => {
            obj[item[key]] = item;
            return obj;
          }, {});
        };
        const likedDogs = arrayToObject1(data, 'petfinderDogId');
        this.setState({ likedDogs });
      })
      .catch(err => {
        const { handleNetworkError } = this.context;
        handleNetworkError(err);
      });
  }

  makeListItem() {
    const likedDogsArray = Object.values(this.state.likedDogs);
    return likedDogsArray.map((doggo, index) => {
      const petfinderDogId = doggo.petfinderDogId;
      return (
        <a href={`#favorite?petfinderDogId=${petfinderDogId}`} key={index} className='d-flex pt-3 pb-3 align-items-center list-group-item list-group-item-action'>
          <div className='circle-img-container'>
            <img src={doggo.photoUrls[0]} className='favorites-img' alt="" />
          </div>
          <div className='favorites-text-container'>
            <h1 className='favorites-name mb-0'>{doggo.name}</h1>
            <p className={doggo.location ? 'favorites-text mb-0' : 'd-none'}>{doggo.location}</p>
          </div>
        </a>
      );
    });
  }

  componentDidMount() {
    this.getLikedDogs();
  }

  render() {
    const { route } = this.context;
    if (route.path === 'favorites') {
      return (
        <div className='container'>
          <div className='row'>
            <div className='col'>
              <h1 className='page-title mt-0 mb-0'>Goodest Doggos</h1>
            </div>
          </div>
          <div className='row justify-content-center'>
            <div className='col col-md-5'>
              <div className='list-group'>
                {this.state.likedDogs === null ? null : this.makeListItem()}
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (route.path === 'favorite') {
      const petfinderDogId = route.params.get('petfinderDogId');
      return <FavoriteDetail data={this.state.likedDogs[petfinderDogId]} />;
    }
  }
}

Favorites.contextType = AppContext;
