import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import theme from './muiTheme';
import { ThemeProvider } from '@material-ui/core';

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Layout>
          <h1>A Wee Bit Weeb</h1>
          <Route exact path="/" component={Home} />
        </Layout>
      </ThemeProvider>
    );
  }
}
