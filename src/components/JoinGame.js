import React, { useState } from "react";
import {Button} from '@material-ui/core'
import CustomTextField from './customMaterial/CustomTextField'
import theme from '../muiTheme'

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
      <p style={{ color: theme.palette.secondary.main }}>Join Game</p>
      <CustomTextField label="Lobby Name" variant="outlined" onChange={handleChange} />
      <Button variant="contained" color="primary" onClick={() => props.connectToGame(state.gameName)}>Go</Button>
    </div>
  );
};
