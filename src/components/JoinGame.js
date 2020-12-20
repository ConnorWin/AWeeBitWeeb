import React, { useState } from 'react';

export const JoinGame = (props) => {

  const initialState = {
    gameName: null
  }
  const [state, setState] = useState(initialState);
  

  const handleChange = (event) => {
    setState({gameName: event.target.value});
  }

  return(
  <div>
    <p>Join Game</p>
    <input placeholder='Lobby Name' type="text" onChange={handleChange}/>
    <button onClick={() =>props.connectToGame(state.gameName)}>Go</button>
  </div>
  )
}