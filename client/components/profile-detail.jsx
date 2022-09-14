import React from 'react';

export default class ProfileDetail extends React.Component {
  constructor(props) {
    super(props);
    this.makeIndicators = this.makeIndicators.bind(this);
    this.makeCarouselItems = this.makeCarouselItems.bind(this);
  }

  makeCarouselItems(props) {
    return this.props.doggo.photos.map((image, index) => {
      return (
        <div key={index} className={index === 0 ? 'carousel-item active' : 'carousel-item'}>
          <img src={image} className="d-block w-100" />
        </div>
      );
    });
  }

  makeIndicators(props) {
    return this.props.doggo.photos.map((image, index) => {
      return <button key={index} type='button' data-bs-target='#carousel' data-bs-slide-to={index} aria-label={`Slide ${index}`} className={index === 0 ? 'active' : ''} aria-current={index === 0 ? 'true' : ''}></button>;
    });
  }

  render() {
    return (
      <div className='row'>
        <div id="carousel" className="carousel slide" data-bs-ride="true">
          <div className="carousel-indicators">
            {this.makeIndicators(this.props)}
          </div>
          <div className="carousel-inner">
            {this.makeCarouselItems(this.props)}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    );
  }
}
