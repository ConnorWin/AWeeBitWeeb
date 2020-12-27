import React, { Component } from "react";
import { pingLobby, listenForGameStarting, endLobby } from "../api";
import {Button} from '@material-ui/core'
import theme from '../muiTheme'
export class Lobby extends Component {
  constructor(props) {
    super(props);
    pingLobby((game) => {
      console.log(JSON.stringify(game));
      this.setState({
        players: game.players,
      });
    });
    listenForGameStarting(() => {
      endLobby();
      this.props.goToGame();
    });
  }

  state = {
    players: this.props.players ? this.props.players : [],
  };

  render() {
    const currentPlayersInLobby = this.state.players?.map((player, index) => (
      <li key={index} style={{ color: theme.palette.primary.main }}>{player}</li>
    ));
    return (
      <div>
        <h2 style={{ color: theme.palette.secondary.main }}>Lobby {this.props.gameName}</h2>
        {currentPlayersInLobby}
        {this.props.isCreator ? (
          <Button variant="contained" color="primary" onClick={() => this.props.startGame()}>Start Game</Button>
        ) : null}
      </div>
    );
  }
}
