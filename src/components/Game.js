import React, { useEffect, useState } from "react";
import { listenForTurnStarting, endTurn, listenForGameEnding } from "../api";
import AuthContext from "../context/AuthContext";
import {Button} from '@material-ui/core'
import theme from '../muiTheme'
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';

export const Game = (props) => {
  const { userName } = React.useContext(AuthContext);

  useEffect(() => {
    listenForTurnStarting(handleTurn);
    listenForGameEnding(handleGameEnd);
  });

  // const initialState = {
  //   playerGoing: null,
  //   card: null,
  //   isGameOver: false,
  //   flip: true
  // };
  // const [state, setState] = useState(initialState);

  const [playerGoing, setPlayerGoing] = useState(null);
  const [card, setCard] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [flip, setFlip] = useState(true);

  const handleTurn = ({ player, card }) => {
    setPlayerGoing(player);
    setCard(card);
  };
  const handleGameEnd = () => {
    setIsGameOver(true);
  };

  const passTurn = () => {
    setFlip(prev => !prev)
    endTurn();
    setTimeout(() => {
      setFlip(prev => !prev)
    }, 500)
  }

  const useStyles = makeStyles((theme) => ({
    paper: {
      zIndex: 1,
      position: 'relative',
      border: '.5rem solid white',
      background: '#003287'
    },
  }));

  const classes = useStyles();

  const view = isGameOver ? (
    <p style={{ color: theme.palette.primary.main }}>GG, Ya'll</p>
  ) : (
<div>
  <li style={{ color: theme.palette.primary.main }}>{playerGoing}'s Turn</li>
  <Slide direction="up" in={flip} mountOnEnter unmountOnExit style={{ color: theme.palette.primary.main }}>
    <Paper elevation={4} className={classes.paper}>
      <div >
        <li>{card?.type}</li>
        <li>{card?.question}</li>
        {userName === playerGoing ? (
          <Button variant="contained" color="primary" onClick={passTurn}>Pass Turn</Button>
        ) : null}
      </div>
    </Paper>
  </Slide>
</div>

  );

  return view;
};
