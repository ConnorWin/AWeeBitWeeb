import React, { Component } from 'react';
import styles from './Home.module.css';
import AuthContext from '../context/AuthContext';
import {Authentication} from './Authentication';
import {LobbyConnect} from './LobbyConnect';
import {Lobby} from './Lobby';
import { createGame, joinGame } from '../api';

export class Home extends Component {

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    // subscribeToTimer((err, timestamp) => this.setState({ 
    //   timestamp 
    // }));
  }

  state = {
    timestamp: 'no timestamp yet',
    authenticated: false,
    userName: null,
    gameName: null
  }

  loginHandler = (userName) => {
    this.setState({ authenticated: true, userName });
  };

  readyPlayer = (gameName) => {
    this.setState({ gameName});
  };

  handleLobbyState = (serverResponse) => {
    console.log(`got lobby stats from server ${JSON.stringify(serverResponse)}`)
    this.setState({players: serverResponse.players})
  }
  
  render () {
    let view = null;
    
    if (!this.state.gameName) {
      view = (        this.state.authenticated ?
        (
        <React.Fragment>
                <p className="App-intro">
                  This is the timer value: {this.state.timestamp}
                  </p>
          <LobbyConnect userName={this.state.userName} readyPlayer={this.readyPlayer} joinGame={joinGame} createGame={createGame} handleLobbyState={this.handleLobbyState}/>
          </React.Fragment>):
        <Authentication/>)
    } else {
      view = (<Lobby gameName={this.state.gameName} players={this.state.players}/>);
      }

    return (
      <AuthContext.Provider
      value={{
        authenticated: this.state.authenticated,
        userName: this.state.userName,
        login: this.loginHandler
      }}
    >
      {view}
      </AuthContext.Provider>
    );
}
}
