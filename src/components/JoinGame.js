import React, { Component } from 'react';

export class JoinGame extends Component {
  handleChange = (event) => {
    this.setState({gameName: event.target.value});
  }

  render() {
    return(
    <div>
      <p>Join Game</p>
      <input placeholder='Lobby Name' type="text" onChange={this.handleChange}/>
      <button onClick={() =>this.props.connectToGame(this.state.gameName)}>Go</button>
    </div>
    )
}
}