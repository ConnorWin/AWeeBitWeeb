import React, { Component } from 'react';

export class Lobby extends Component {

  render() {
    return(
    <div>
      <p>Lobby {this.props.gameName}</p>
    </div>
    )
}
}
