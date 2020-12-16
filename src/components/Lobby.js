import React, { Component } from 'react';
import { pingLobby, listenForGameStarting, endLobby } from '../api';
export class Lobby extends Component {

  constructor(props) {
    super(props);
    // subscribeToTimer((err, timestamp) => this.setState({ 
    //   timestamp 
    // }));
    pingLobby((game) => {
      console.log(JSON.stringify(game))
      this.setState({
      players: game.players
      })
    });
    listenForGameStarting(() => 
    {
      endLobby();
      this.props.goToGame()})
  }

state = {
  players: this.props.players ? this.props.players : []
}

  render() {
  const currentPlayersInLobby = this.state.players?.map((player, index) =>
    <li key={index}>{player}</li>
  );
    return(
    <div>
      <h2>Lobby {this.props.gameName}</h2>
      {currentPlayersInLobby}
      {this.props.isCreator ? <button onClick={() => this.props.startGame()}>Start Game</button> : null}
    </div>
    )
}
}
