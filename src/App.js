import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import AuthContext from './context/AuthContext';

import './custom.css'

export default class App extends Component {
  static contextType = AuthContext;



  render () {
    return (
      <Layout>
        <h1>A Wee Bit Weeb</h1>
        <Route exact path='/' component={Home} />
        
      </Layout>
    );
  }
}
