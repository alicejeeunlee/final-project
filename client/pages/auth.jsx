import React from 'react';
import AppContext from '../lib/app-context';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleDemo(event) {
    const { route } = this.context;
    if (route.path === 'sign-in') {
      this.setState({
        name: 'DEMO',
        email: 'demo@email.com',
        password: 'password'
      });
    } else {
      window.location.hash = 'sign-in';
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { route } = this.context;
    fetch(`/api/auth/${route.path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(result => {
        const { handleSignIn } = this.context;
        if (route.path === 'sign-up' || route.path === '') {
          window.location.hash = 'sign-in';
        } else if (result.user && result.token) {
          handleSignIn(result);
          window.location.replace('#discover');
        }
      })
      .catch(err => {
        const { handleNetworkError } = this.context;
        handleNetworkError(err);
      });
  }

  render() {
    const { route } = this.context;
    const welcomeMessage = route.path === 'sign-in' ? 'Sign In' : 'Create an Account';
    const signUpInput = route.path === 'sign-in' ? 'd-none' : 'input-group mb-3';
    const hrefButton = route.path === 'sign-in' ? 'New User' : 'Login';
    const altHref = route.path === 'sign-in' ? '#sign-up' : '#sign-in';
    const submitButton = route.path === 'sign-in' ? 'Login' : 'Sign Up';
    const demoButton = route.path === 'sign-in' ? 'Demo User Login' : 'DEMO ACCOUNT';
    const isRequired = route.path !== 'sign-in';
    return (
      <div className='container-fluid form-bg-img text-center'>
        <div className='row justify-content-center'>
          <div className='col-11 col-sm-7 col-md-5 col-lg-4 col-xl-3 form-background mt-3 ms-3 me-3'>
            <h1 className='form-title mt-0 mb-0 pt-3'>{welcomeMessage}</h1>
            <h2 className='form-subtitle mb-2'>Find Your Forever Furry Friend</h2>
            <form onSubmit={this.handleSubmit}>
              <button className='demo-button mb-3' onClick={this.handleDemo}>{demoButton}</button>
              <div className={signUpInput}>
                <i id='basic-addon1' className='bi bi-person input-group-text'></i>
                <input
                  required={isRequired}
                  id='name'
                  type='text'
                  name='name'
                  onChange={this.handleChange}
                  value={this.state.name}
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
                  value={this.state.email}
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
                  value={this.state.password}
                  className='form-control'
                  placeholder='Password' />
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

AuthForm.contextType = AppContext;
