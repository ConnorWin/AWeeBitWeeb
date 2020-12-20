import React, { Component } from 'react';
import styles from './Home.module.css';
import AuthContext from '../context/AuthContext';
import {Authentication} from './Authentication';
import {LobbyConnect} from './LobbyConnect';
import {Lobby} from './Lobby';
import {Game} from './Game';
import { createGame, joinGame, startGame } from '../api';

export class Home extends Component {

  static contextType = AuthContext;

  constructor(props) {
    super(props);
  }

  state = {
    timestamp: 'no timestamp yet',
    authenticated: false,
    userName: null,
    gameName: null,
    gameHasStarted: false
  }

  loginHandler = (userName) => {
    this.setState({ authenticated: true, userName });
  };

  readyPlayer = (gameName) => {
    this.setState({ gameName});
  };

  handleLobbyState = (serverResponse) => {
    this.setState({
      isCreator: serverResponse.creator === this.state.userName,
      players: serverResponse.players})
  }

  startGame = () => {
    startGame();
    this.setState({gameHasStarted: true});
  }
  
  goToGame = () => {
    this.setState({gameHasStarted: true});
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
          <LobbyConnect userName={this.state.userName} readyPlayer={this.readyPlayer} joinGame={joinGame} createGame={createGame} handleLobbyState={this.handleLobbyState} />
          </React.Fragment>):
        <Authentication/>)
    } else if (!this.state.gameHasStarted) {
      view = (<Lobby gameName={this.state.gameName} players={this.state.players} isCreator={this.state.isCreator} startGame={this.startGame} goToGame={this.goToGame}/>);
      } else {
        view = (<Game />);
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
