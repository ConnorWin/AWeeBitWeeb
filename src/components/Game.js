import React, { Component } from 'react';
import {listenForTurnStarting, endTurn} from '../api'
import AuthContext from '../context/AuthContext';

export class Game extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    listenForTurnStarting(this.handleTurn)  
  }

  state = {
    playerGoing: null,
    card: null
  }

  handleTurn = ({player, card}) => {
    this.setState({playerGoing: player, card})
  }
  render() {
    return(
    <div>
      <li>{this.state.playerGoing}'s Turn</li>
      <li>{this.state.card?.type}</li>
      <li>{this.state.card?.question}</li>
      {this.context.userName === this.state.playerGoing ? <button>Pass Turn</button> : null}
    </div>
    )
}
}