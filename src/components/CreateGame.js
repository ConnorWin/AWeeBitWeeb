import React, { Component } from 'react';

export class CreateGame extends Component {
  handleChange = (event) => {
    this.setState({gameName: event.target.value});
}
  render() {
    return(
    <div>
      <p>Create Game</p>
      <input placeholder='Lobby Name' type="text" onChange={this.handleChange}/>
      <button onClick={() =>this.props.createGame(this.state.gameName)}>Go</button>
    </div>
    )
}
}