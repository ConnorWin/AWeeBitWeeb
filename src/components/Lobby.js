import React, { Component } from 'react';
export class Lobby extends Component {

state = {
  players: this.props.players
}

  render() {
  const currentPlayersInLobby = this.state.players?.map((player, index) =>
    <li key={index}>{player}</li>
  );
    return(
    <div>
      <h2>Lobby {this.props.gameName}</h2>
      {currentPlayersInLobby}
    </div>
    )
}
}
