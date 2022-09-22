import React from 'react';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      location: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { route } = this.props.route;
    fetch(`/api/auth/${route.path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(result => {
        if (route.path === 'sign-up' || route.path === '') {
          window.location.hash = 'sign-in';
        } else if (result.user && result.token) {
          this.props.onSignIn(result);
          window.location.replace('#discover');
        }
      });
  }

  render() {
    const { route } = this.props.route;
    const welcomeMessage = route.path === 'sign-in' ? 'Sign In' : 'Create an Account';
    const signUpInput = route.path === 'sign-in' ? 'd-none' : 'input-group mb-3';
    const hrefButton = route.path === 'sign-in' ? 'New User' : 'Login';
    const altHref = route.path === 'sign-in' ? '#sign-up' : '#sign-in';
    const submitButton = route.path === 'sign-in' ? 'Login' : 'Sign Up';
    const isRequired = route.path !== 'sign-in';
    return (
      <div className='container-fluid form-bg-img text-center'>
        <div className='row justify-content-center'>
          <div className='col-11 col-sm-7 col-md-5 col-lg-4 col-xl-3 form-background mt-3 ms-3 me-3'>
            <h1 className='form-title mt-0 mb-0 pt-3'>{welcomeMessage}</h1>
            <h2 className='form-subtitle mb-4'>Find Your Forever Furry Friend</h2>
            <form onSubmit={this.handleSubmit}>
              <div className={signUpInput}>
                <i id='basic-addon1' className='bi bi-person input-group-text'></i>
                <input
                  required={isRequired}
                  id='name'
                  type='text'
                  name='name'
                  onChange={this.handleChange}
                  className='form-control'
                  placeholder='Name' />
              </div>
              <div className='input-group mb-3'>
                <i id='basic-addon2' className='bi bi-envelope input-group-text'></i>
                <input
                  required
                  id='email'
                  type='email'
                  name='email'
                  onChange={this.handleChange}
                  className='form-control'
                  placeholder='Email' />
              </div>
              <div className='input-group mb-3'>
                <i id='basic-addon3' className='bi bi-lock input-group-text'></i>
                <input
                  required
                  id='password'
                  type='password'
                  name='password'
                  onChange={this.handleChange}
                  className='form-control'
                  placeholder='Password' />
              </div>
              <div className={signUpInput}>
                <i id='basic-addon4' className='bi bi-pin-map input-group-text'></i>
                <input
                  required={isRequired}
                  id='location'
                  type='text'
                  name='location'
                  onChange={this.handleChange}
                  className='form-control'
                  placeholder='City, State' />
              </div>
              <div className='d-flex justify-content-around pt-1 pb-3'>
                <button className='form-button' type='button'><a className='auth-button-text' href={altHref}>{hrefButton}</a></button>
                <button className='form-button' type='submit'>{submitButton}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
