import React, { useState } from "react";
import {Button} from '@material-ui/core'
import CustomTextField from './customMaterial/CustomTextField'
import theme from '../muiTheme'
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
      <p style={{ color: theme.palette.secondary.main }}>Create Game</p>
      <CustomTextField label="Lobby Name" variant="outlined" onChange={handleChange} />
      <Button variant="contained" color="primary" onClick={() => props.createGame(state.gameName)}>Go</Button>
    </div>
  );
};
