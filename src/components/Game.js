import React, { Component } from 'react';
import {listenForTurnStarting} from '../api'

export class Game extends Component {
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
    </div>
    )
}
}