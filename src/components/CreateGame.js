import React, { useState } from 'react';

export const CreateGame = (props) => {
  const initialState = {
    gameName: null
  }

  const [state, setState] = useState(initialState);

  const handleChange = (event) => {
      setState({gameName: event.target.value});
  }

  return (
  <div>
    <p>Create Game</p>
    <input placeholder='Lobby Name' type="text" onChange={handleChange}/>
    <button onClick={() =>props.createGame(state.gameName)}>Go</button>
  </div>
  )
}