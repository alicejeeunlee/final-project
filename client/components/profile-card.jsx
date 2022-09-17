import React from 'react';

export default class ProfileCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      swipe: null
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    if (event.target.classList.contains('btn-outline-success')) {
      const reqBody = Object.assign(this.props.data, { isLiked: true });
      fetch('/api/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
      })
        .then(res => {
          if (!res.ok) throw new Error('Fetch failed at ProfileCard handeClick().');
        });
    }
  }

  render() {
    return (
      <div className='row justify-content-center'>
        <div className='col-md-9 col-lg-7 col-xl-6'>
          <a href="#details">
            <div className='card'>
              <img src={this.props.data.photos[0]} className='card-img-top' alt="" />
              <div className='card-body'>
                <div className='d-flex align-items-center'>
                  <h2 className='card-title mt-0 mb-0'>{this.props.data.name}</h2>
                  <i className="fa-solid fa-bone ms-2 me-2"></i>
                  <h3 className='card-subtitle mt-0 mb-0'>{this.props.data.breed}</h3>
                </div>
                <h4 className='card-text'>{this.props.data.distance}</h4>
              </div>
            </div>
          </a>
          <div id="card-buttons" className='justify-content-between mt-4'>
            <button className='btn btn-outline-danger btn-lg pt-0 pb-0'>NOPE</button>
            <button className='btn btn-outline-success btn-lg pt-0 pb-0' onClick={this.handleClick}>LOVE</button>
          </div>
        </div>
      </div>
    );
  }
}
