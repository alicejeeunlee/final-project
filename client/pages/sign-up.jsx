import React from 'react';

export default class SignUp extends React.Component {
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
    fetch('/api/auth/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(result => {
        window.location.hash = 'sign-in';
      });
  }

  render() {
    return (
      <div className='container form-bg-img text-center'>
        <div className='row justify-content-center'>
          <div className='col-11 form-background mt-5 ms-3 me-3'>
            <h1 className='form-title mt-0 mb-0 pt-3'>Create An Account</h1>
            <h2 className='form-subtitle mb-4'>Find Your Forever Furry Friend</h2>
            <form onSubmit={this.handleSubmit}>
              <div className='input-group mb-3'>
                <i id='basic-addon1' className='bi bi-person input-group-text'></i>
                <input
                required
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
              <div className='input-group mb-4'>
                <i id='basic-addon4' className='bi bi-geo-alt input-group-text'></i>
                <input
                required
                id='location'
                type='text'
                name='location'
                onChange={this.handleChange}
                className='form-control'
                placeholder='City, State' />
              </div>
              <div className='d-flex justify-content-around pb-3'>
                <button className='form-button' type='button'><a className='auth-button-text' href='#sign-in'>Login</a></button>
                <button className='form-button' type='submit'>Sign Up</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
