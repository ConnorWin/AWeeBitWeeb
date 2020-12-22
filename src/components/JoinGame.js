import React, { useState } from "react";
import {Button, TextField} from '@material-ui/core'

export const JoinGame = (props) => {
  const initialState = {
    gameName: null,
  };
  const [state, setState] = useState(initialState);

  const handleChange = (event) => {
    setState({ gameName: event.target.value });
  };

  return (
    <div>
      <p>Join Game</p>
      <TextField label="Lobby Name" variant="outlined" onChange={handleChange} />
      <Button onClick={() => props.connectToGame(state.gameName)}>Go</Button>
    </div>
  );
};
