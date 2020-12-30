import React, { useEffect, useState } from "react";
import { listenForTurnStarting, endTurn, listenForGameEnding } from "../api";
import AuthContext from "../context/AuthContext";
import {Button} from '@material-ui/core'
import theme from '../muiTheme'
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';

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
    flip: true
  };
  const [state, setState] = useState(initialState);

  const handleTurn = ({ player, card }) => {
    setState({ playerGoing: player, card });
  };
  const handleGameEnd = () => {
    setState({ isGameOver: true });
  };

  const passTurn = () => {
    setState({flip: !state.flip})
    setTimeout(() => {
      endTurn();
      setState({flip: !state.flip})
    }, 2000)
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      height: 180,
    },
    wrapper: {
      width: 100 + theme.spacing(2),
    },
    paper: {
      zIndex: 1,
      position: 'relative',
      margin: theme.spacing(1),
    },
    svg: {
      width: 100,
      height: 100,
    },
    polygon: {
      fill: theme.palette.common.white,
      stroke: theme.palette.divider,
      strokeWidth: 1,
    },
  }));

  const classes = useStyles();

  const view = state.isGameOver ? (
    <p style={{ color: theme.palette.primary.main }}>GG, Ya'll</p>
  ) : (
    <div>
            <Slide direction="up" in={!!state.flip ? true : (state.flip === undefined ? true : false)} mountOnEnter unmountOnExit style={{ color: theme.palette.primary.main }}>
                <Paper elevation={4} className={classes.paper}>
            <svg className={classes.svg}>
              <polygon points="0,100 50,00, 100,100" className={classes.polygon} />
            </svg>
          
      <div >
        <li>{state.playerGoing}'s Turn</li>
        <li>{state.card?.type}</li>
        <li>{state.card?.question}</li>
        {userName === state.playerGoing ? (
          <Button variant="contained" color="primary" onClick={passTurn}>Pass Turn</Button>
        ) : null}
      </div>
      </Paper>
    </Slide>
    </div>

  );

  return view;
};
