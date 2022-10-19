import React from 'react';

export default function NetworkError(props) {
  const { error } = props;
  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col col-md-5'>
          <div className='alert alert-info' role='alert'>
            <h1>Network Error</h1>
            <p>Response from server: {error}.</p>
            <p>Sorry, there was an error connecting to the network! Please check your internet connection and try again.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
