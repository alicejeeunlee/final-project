import React from 'react';

export default class ProfileCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      swipeDirection: null
    };
    this.onTouchStart = this.onTouchStart.bind(this);
    this.swipe = {};
    this.threshold = 50;
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  onTouchStart(event) {
    this.swipe = { x: event.changedTouches[0].screenX };
  }

  onTouchEnd(event) {
    const diffX = event.changedTouches[0].screenX - this.swipe.x;
    if (diffX > this.threshold) {
      this.props.handleSwipe('right');
      this.setState({ swipeDirection: 'right' });
    } else if (diffX < -(this.threshold)) {
      this.setState({ swipeDirection: 'left' });
    }
    this.swipe = {};
  }

  handleClick(event) {
    if (event.target.classList.contains('btn-outline-success')) {
      this.props.handleSwipe('right');
      this.setState({ swipeDirection: 'right' });
    } else if (event.target.classList.contains('btn-outline-danger')) {
      this.setState({ swipeDirection: 'left' });
    }
  }

  componentDidUpdate(previousProps, previousState) {
    if (this.props.data.doggoId !== previousProps.data.doggoId) {
      this.setState({ swipeDirection: null });
    }
  }

  render() {
    let cardAnimation;
    let showIcon;
    if (this.state.swipeDirection === 'right') {
      cardAnimation = 'card love';
      showIcon = 'fa-regular fa-face-grin-hearts';
    } else if (this.state.swipeDirection === 'left') {
      cardAnimation = 'card nope';
      showIcon = 'fa-regular fa-face-meh';
    } else {
      cardAnimation = 'card';
      showIcon = 'd-none';
    }
    return (
      <div id='card-container' className='row justify-content-center'>
        <div className='col-md-9 col-lg-7 col-xl-6'>
          <a href="#details">
            <div className={cardAnimation}
            onTouchStart={this.onTouchStart}
            onTouchEnd={this.onTouchEnd}
            >
              <div className='card-img-container'>
                <img key={this.props.data.photos[0]} src={this.props.data.photos[0]} className='card-img-top' alt="" />
                <i className={showIcon}></i>
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
            <button className='btn btn-outline-danger btn-lg pt-0 pb-0' onClick={this.handleClick}>NOPE</button>
            <button className='btn btn-outline-success btn-lg pt-0 pb-0' onClick={this.handleClick}>LOVE</button>
          </div>
        </div>
      </div>
    );
  }
}
