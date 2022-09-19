import React from 'react';

export default class ProfileCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLiked: null
    };
    this.swipe = {};
    this.threshold = 50;
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.love = this.love.bind(this);
  }

  onTouchStart(event) {
    this.swipe = { x: event.changedTouches[0].screenX };
  }

  onTouchEnd(event) {
    const diffX = event.changedTouches[0].screenX - this.swipe.x;
    if (diffX > this.threshold) {
      this.love();
      this.setState({ isLiked: true });
    }
    this.swipe = {};
  }

  handleClick(event) {
    if (event.target.classList.contains('btn-outline-success')) {
      this.love();
      this.setState({ isLiked: true });
    }
  }

  love() {
    const reqBody = Object.assign(this.props.data, { isLiked: true });
    fetch('/api/love', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqBody)
    })
      .then(res => {
        if (!res.ok) throw new Error('Fetch failed to POST');
      })
      .catch(err => console.error('Fetch failed at ProfileCard handeClick().', err));
  }

  render() {
    return (
      <div className='row justify-content-center'>
        <div className='col-md-9 col-lg-7 col-xl-6'>
          <a href="#details">
            <div className={this.state.isLiked ? 'card love' : 'card nope'}
            onTouchStart={this.onTouchStart}
            onTouchEnd={this.onTouchEnd}>
              <div className='card-img-container'>
                <img src={this.props.data.photos[0]} className='card-img-top' alt="" />
                <i className={this.state.isLiked ? 'fa-regular fa-face-grin-hearts' : 'd-none'}></i>
              </div>
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
