import React, { useState } from "react";
import {Button, TextField} from '@material-ui/core'

export const CreateGame = (props) => {
  const initialState = {
    gameName: null,
  };

  const [state, setState] = useState(initialState);

  const handleChange = (event) => {
    setState({ gameName: event.target.value });
  };

  return (
    <div>
      <p>Create Game</p>
      <TextField label="Lobby Name" variant="outlined" onChange={handleChange} />
      <Button variant="contained" color="primary" onClick={() => props.createGame(state.gameName)}>Go</Button>
    </div>
  );
};
