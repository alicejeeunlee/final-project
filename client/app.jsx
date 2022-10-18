import React from 'react';
import jwtDecode from 'jwt-decode';
import LogoNavbar from './components/logo-navbar';
import AuthForm from './pages/auth';
import Discover from './pages/discover';
import Favorites from './pages/favorites';
import Account from './pages/account';
import MobileNavbar from './components/mobile-navbar';
import NetworkError from './components/network-error';
import parseRoute from './lib/parse-route';
import AppContext from './lib/app-context';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash),
      networkError: null
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleNetworkError = this.handleNetworkError.bind(this);
  }

  componentDidMount() {
    addEventListener('hashchange', event => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
    const token = window.localStorage.getItem('woofles-jwt');
    const user = token ? jwtDecode(token) : null;
    this.setState({ user, isAuthorizing: false });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('woofles-jwt', token);
    this.setState({ user });
  }

  handleSignOut() {
    window.localStorage.removeItem('woofles-jwt');
    this.setState({ user: null });
    window.location.replace('#sign-up');
  }

  handleNetworkError(error) {
    this.setState({ networkError: error.message });
  }

  renderPage() {
    const { path } = this.state.route;
    if (this.state.networkError) {
      return <NetworkError error={this.state.networkError}/>;
    }
    if (this.state.isAuthorizing || path === 'sign-up' || path === 'sign-in' || path === '') {
      return <AuthForm route={this.state} />;
    }
    if (path === 'discover' || path === 'details') {
      return <Discover state={this.state} />;
    }
    if (path === 'favorites' || path === 'favorite') {
      return <Favorites />;
    }
    if (path === 'account') {
      return <Account />;
    }
  }

  render() {
    const { user, route } = this.state;
    const { handleSignIn, handleSignOut, handleNetworkError } = this;
    const contextValue = { user, route, handleSignIn, handleSignOut, handleNetworkError };
    return (
      <AppContext.Provider value={contextValue}>
        <>
          <LogoNavbar route={this.state} />
          {this.renderPage()}
          <MobileNavbar />
        </>
      </AppContext.Provider>

    );
  }
}

App.contextType = AppContext;
