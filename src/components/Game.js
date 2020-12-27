import React, { useEffect, useState } from "react";
import { listenForTurnStarting, endTurn, listenForGameEnding } from "../api";
import AuthContext from "../context/AuthContext";
import {Button} from '@material-ui/core'
import theme from '../muiTheme'

export const Game = (props) => {
  const { userName } = React.useContext(AuthContext);

  useEffect(() => {
    listenForTurnStarting(handleTurn);
    listenForGameEnding(handleGameEnd);
  });

  const initialState = {
    playerGoing: null,
    card: null,
    isGameOver: false,
  };
  const [state, setState] = useState(initialState);

  const handleTurn = ({ player, card }) => {
    setState({ playerGoing: player, card });
  };
  const handleGameEnd = () => {
    setState({ isGameOver: true });
  };

  const view = state.isGameOver ? (
    <p style={{ color: theme.palette.primary.main }}>GG, Ya'll</p>
  ) : (
    <div style={{ color: theme.palette.primary.main }}>
      <li>{state.playerGoing}'s Turn</li>
      <li>{state.card?.type}</li>
      <li>{state.card?.question}</li>
      {userName === state.playerGoing ? (
        <Button variant="contained" color="primary" onClick={endTurn}>Pass Turn</Button>
      ) : null}
    </div>
  );

  return view;
};
