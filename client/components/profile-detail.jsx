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
          <img src={image} className="d-block w-100 carousel-radius" />
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
      <>
        <div className='row mt-3'>
          <div className='col'>
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
        </div>
        <div className='row'>
          <div className='col'>
            <h1 className='detail-h1 mt-3 mb-3'>Meet Nala</h1>
            <div className='description-border pt-3 pb-3'>
              <p className='detail-p'>Doggo ipsum boofers pupperino super chub yapper, wow such tempt heck very jealous pupper smol, porgo ruff. super chub doggo. Borkf boofers woofer puggo borkdrive heckin good boys, very hand that feed shibe waggy wags yapper. Puggorino wow such tempt pats borkdrive I am bekom fat shooberino tungg, big ol puggo heckin borking doggo thicc. </p>
              <a href='' className='detail-p d-flex justify-content-end'>Read More About Nala</a>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col mt-3'>
            <div className='d-flex justify-content-center align-items-baseline'>
              <p className='detail-p'>Golden Retriever</p>
              <i className="fa-solid fa-bone ms-2 me-2"></i>
              <p className='detail-p'>Irvine, CA</p>
            </div>
            <div className='d-flex justify-content-center align-items-baseline'>
              <p className='detail-p'>Adult</p>
              <i className="fa-solid fa-bone ms-2 me-2"></i>
              <p className='detail-p'>Female</p>
              <i className="fa-solid fa-bone ms-2 me-2"></i>
              <p className='detail-p'>Large</p>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <div className='about-border pt-3 pb-3'>
              <h1 className='detail-h1'>About</h1>
              <h2 className='detail-h2 ms-3'>Characteristics</h2>
              <p className='detail-p ms-5'>Friendly, Walks on a leash, Couch potato</p>
              <h2 className='detail-h2 ms-3'>Health</h2>
              <p className='detail-p ms-5'>Spayed/Neutered, Vaccinated</p>
              <h2 className='detail-h2 ms-3'>Good In A Home With</h2>
              <p className='detail-p ms-5'>Children, Other Dogs, Other Cats</p>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col pt-3 pb-3'>
            <h1 className='detail-h1'>Organization</h1>
            <div className='d-flex align-items-baseline'>
              <i className="fa-solid fa-location-dot mt-0 mb-3 ms-3 me-3"></i>
              <p className='detail-p mt-0 mb-3'>12345 Address<br />Address, AD 88888</p>
            </div>
            <div className='d-flex align-items-center'>
              <i className="fa-solid fa-envelope mt-0 mb-3 ms-3 me-3"></i>
              <p className='detail-p mt-0 mb-3'>email@email.com</p>
            </div>
            <div className='d-flex align-items-center'>
              <i className="fa-solid fa-phone mt-0 mb-3 ms-3 me-3"></i>
              <p className='detail-p mt-0 mb-3'>(888) 888 - 8888</p>
            </div>
          </div>
        </div>
      </>
    );
  }
}
