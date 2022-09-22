import React from 'react';
import AuthForm from './pages/auth';
import Discover from './pages/discover';
import LogoNavbar from './components/logo-navbar';
import MobileNavbar from './components/mobile-navbar';
import parseRoute from './lib/parse-route';
import AppContext from './lib/app-context';

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

  renderPage() {
    const { path } = this.state.route;
    if (this.state.isAuthorizing || path === 'sign-up' || path === 'sign-in') {
      return <AuthForm route={this.state} onSignIn={this.handleSignIn} />;
    }
    if (path === 'discover' || path === 'details') {
      return <Discover state={this.state} />;
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
