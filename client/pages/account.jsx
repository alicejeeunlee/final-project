import React from 'react';
import AppContext from '../lib/app-context';

export default class Account extends React.Component {
  render() {
    return <h1>ACCOUNT</h1>;
  }
}

Account.contextType = AppContext;
