import React, { Component, Fragment } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import theme from './muiTheme';
import { ThemeProvider } from '@material-ui/core';

export default class App extends Component {
  render() {
    return (
      <div style={{ background: 'black', height: '100vh' }}>
        <ThemeProvider theme={theme}>
          <Layout>
            <h1 style={{ color: theme.palette.secondary.main }}>
              A Wee Bit Weeb
            </h1>
            <Route exact path="/" component={Home} />
          </Layout>
        </ThemeProvider>
      </div>
    );
  }
}
