import React from 'react';
import jwtDecode from 'jwt-decode';
import LogoNavbar from './components/logo-navbar';
import AuthForm from './pages/auth';
import Discover from './pages/discover';
import Favorites from './pages/favorites';
import MobileNavbar from './components/mobile-navbar';
import parseRoute from './lib/parse-route';
import AppContext from './lib/app-context';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash)
    };
    this.handleSignIn = this.handleSignIn.bind(this);
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

  renderPage() {
    const { path } = this.state.route;
    if (this.state.isAuthorizing || path === 'sign-up' || path === 'sign-in' || path === '') {
      return <AuthForm route={this.state} onSignIn={this.handleSignIn} />;
    }
    if (path === 'discover' || path === 'details') {
      return <Discover state={this.state} />;
    }
    if (path === 'favorites' || path === 'favorite') {
      return <Favorites />;
    }
  }

  render() {
    const { user, route } = this.state;
    const contextValue = { user, route };
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
