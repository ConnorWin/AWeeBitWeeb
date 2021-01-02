import React, { Component, Fragment } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import theme from './muiTheme';
import { ThemeProvider } from '@material-ui/core';
import { KillGame } from './components/KillGame';
export default class App extends Component {
  render() {
    return (
      <div style={{ background: 'black', height: '100vh' }}>
        <ThemeProvider theme={theme}>
          <Layout>
            <Route exact path="/" component={Home} />
            <Route exact path="/killgame" component={KillGame} />
          </Layout>
        </ThemeProvider>
      </div>
    );
  }
}
