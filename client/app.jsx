import React from 'react';
import Discover from './pages/discover';
import LogoNavbar from './components/logo-navbar';
import MobileNavbar from './components/mobile-navbar';
import parseRoute from './lib/parse-route';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    addEventListener('hashchange', event => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
  }

  render() {
    return (
      <>
        <LogoNavbar />
        <Discover route={this.state}/>
        <MobileNavbar />
      </>
    );
  }
}
