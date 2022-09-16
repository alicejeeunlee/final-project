import React from 'react';

export default class ProfileDetail extends React.Component {
  constructor(props) {
    super(props);
    this.makeIndicators = this.makeIndicators.bind(this);
    this.makeCarouselItems = this.makeCarouselItems.bind(this);
  }

  makeCarouselItems(props) {
    return this.props.data.photos.map((image, index) => {
      return (
        <div key={index} className={index === 0 ? 'carousel-item active' : 'carousel-item'}>
          <img src={image} className="d-block w-100 carousel-radius" />
        </div>
      );
    });
  }

  makeIndicators(props) {
    return this.props.data.photos.map((image, index) => {
      return <button key={index} type='button' data-bs-target='#carousel' data-bs-slide-to={index} aria-label={`Slide ${index}`} className={index === 0 ? 'active' : ''} aria-current={index === 0 ? 'true' : ''}></button>;
    });
  }

  render() {
    return (
      <div className='container'>
        <div className='row justify-content-around'>
          <div className='col-md-5'>
            <div className='row mt-3'>
              <div className='col'>
                <div id="carousel" className="carousel slide">
                  <div className={this.props.data.photos.length === 1 ? 'd-none' : 'carousel-indicators'}>
                    {this.makeIndicators(this.props)}
                  </div>
                  <div className="carousel-inner">
                    {this.makeCarouselItems(this.props)}
                  </div>
                  <button className={this.props.data.photos.length === 1 ? 'd-none' : 'carousel-control-prev'} type="button" data-bs-target="#carousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button className={this.props.data.photos.length === 1 ? 'd-none' : 'carousel-control-next'} type="button" data-bs-target="#carousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <h1 className='detail-h1 mt-3 mb-3'>Meet {this.props.data.name}</h1>
                <div className='description-border pt-3 pb-3'>
                  <p className={this.props.data.description === '' ? 'd-none' : 'detail-p'}>{this.props.data.description}</p>
                  <a href={this.props.data.url} target="_blank" rel="noopener noreferrer" className='detail-p d-flex justify-content-center'>Read More About {this.props.data.name}</a>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-5'>
            <div className='row'>
              <div className='col mt-3 mb-3'>
                <div className='d-flex justify-content-center align-items-center'>
                  <p className='detail-p mt-0 mb-0'>{this.props.data.breed}</p>
                  <i className="fa-solid fa-bone  mt-0 mb-0 ms-2 me-2"></i>
                  <p className='detail-p mt-0 mb-0'>{this.props.data.location}</p>
                </div>
                <div className='d-flex justify-content-center align-items-center'>
                  <p className='detail-p mt-0 mb-0'>{this.props.data.age}</p>
                  <i className="fa-solid fa-bone mt-0 mb-0 ms-2 me-2"></i>
                  <p className='detail-p mt-0 mb-0'>{this.props.data.gender}</p>
                  <i className="fa-solid fa-bone  mt-0 mb-0 ms-2 me-2"></i>
                  <p className='detail-p mt-0 mb-0'>{this.props.data.size}</p>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <div className='about-border pt-3 pb-3'>
                  <h1 className='detail-h1'>About</h1>
                  <h2 className={this.props.data.characteristics === '' ? 'd-none' : 'detail-h2 ms-3'}>Characteristics</h2>
                  <p className='detail-p ms-5'>{this.props.data.characteristics}</p>
                  <h2 className={this.props.data.health === '' ? 'd-none' : 'detail-h2 ms-3'}>Health</h2>
                  <p className='detail-p ms-5'>{this.props.data.health}</p>
                  <h2 className={this.props.data.home === '' ? 'd-none' : 'detail-h2 ms-3'}>Good In A Home With</h2>
                  <p className='detail-p ms-5'>{this.props.data.home}</p>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col pt-3 pb-3'>
                <h1 className='detail-h1'>{this.props.data.org}</h1>
                <div className={this.props.data.address2 ? 'd-flex align-items-center' : 'd-none'}>
                  <i className="fa-solid fa-location-dot mt-0 mb-3 ms-3 me-3"></i>
                  <p className='detail-p mt-0 mb-3'>{this.props.data.address1}{this.props.data.address1 ? <br /> : ''}{this.props.data.address2}</p>
                </div>
                <div className={this.props.data.email ? 'd-flex align-items-center' : 'd-none'}>
                  <i className="fa-solid fa-envelope mt-0 mb-3 ms-3 me-3"></i>
                  <p className='detail-p mt-0 mb-3'>{this.props.data.email}</p>
                </div>
                <div className={this.props.data.phone ? 'd-flex align-items-center' : 'd-none'}>
                  <i className="fa-solid fa-phone mt-0 mb-3 ms-3 me-3"></i>
                  <p className='detail-p mt-0 mb-3'>{this.props.data.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
