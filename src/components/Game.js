import React, { useEffect, useState } from "react";
import { listenForTurnStarting, endTurn, listenForGameEnding } from "../api";
import AuthContext from "../context/AuthContext";
import {Button} from '@material-ui/core'
import theme from '../muiTheme'
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import {star, blueEyes} from '../static'
import {Instructions} from './Instructions';

export const Game = (props) => {
  const { userName } = React.useContext(AuthContext);

  useEffect(() => {
    listenForTurnStarting(handleTurn);
    listenForGameEnding(handleGameEnd);
  });

  const [playerGoing, setPlayerGoing] = useState(null);
  const [card, setCard] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [flip, setFlip] = useState(true);
  const [currentDeckCount, setCurrentDeckCount] = useState(0);
  const [totalDeckCount, setTotalDeckCount] = useState(0);
  const [starCount, setStarCount] = useState(0);

  const handleTurn = ({ player, newCard, cardsRemaining, totalCards }) => {
    console.log(JSON.stringify(newCard))
    setPlayerGoing(player);
    setCard(newCard);
    setCurrentDeckCount(cardsRemaining);
    setTotalDeckCount(totalCards);
    setStarCount(parseStarCountFromDescription(newCard.question))
  };
  const parseStarCountFromDescription = (cardText = '') => {
    const result = cardText.match(/\d+/g)
    console.log(JSON.stringify(result))
    return !!result ? Number.parseInt(result[0]) : 0;
  }

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
    cardContainer: {
      width: '75%',
      background: '#ecf4fe',
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'center',
      'border-width': '10px',
      'border-style': 'solid',
      'border-color':'#463C4A'
    },
    card: {
      cursor: 'pointer',
      width: '390px',
      padding: '25px 0',
      display: 'flex',
      'flex-direction': 'column',
      'align-items': 'center',
      'border-radius': '10px',
    },
    monsterName: {
      width: '310px',
      height: '60px',
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'space-between',
      'border-radius': '5px',
      padding: '0 15px',
      color: '#126f97',
      'font-size': '24px',
      'letter-spacing': '1.5px',
      'border-radius': '5px',
      'box-shadow': '-8px -8px 8px rgba(255, 255, 255, 1), -8px -8px 8px rgba(255, 255, 255, .5), inset 2px 2px 4px rgba(255, 255, 255, .1), 5px 5px 10px rgba(0, 0, 0, .15)'
    },
    level: {
      'margin-top': '5px',
      'margin-bottom': '5px',
      width: '310px',
      display: 'flex',
      'flex-direction': 'row',
      'align-items': 'center',
      'justify-content': 'flex-end'
    },
    levelStar: {
      width: '25px',
      'border-radius': '50%',
      'box-shadow': '-2px -2px 5px rgba(255, 255, 255, 1), -2px -2px 5px rgba(255, 255, 255, .5), inset 2px 2px 4px rgba(255, 255, 255, .1), 2px 2px 8px rgba(0, 0, 0, .15)',
      'margin': '0 5px 0 0'
    },
    monsterImageContainer: {
      width: '290px',
      'margin-top': '25px',
      padding: '15px 15px 10px 15px',
      'border-radius': '5px',
    },
    monsterImage: {
      width: '290px',
      height: '290px',
      'box-shadow': '-2px -2px 5px rgba(255, 255, 255, 1), -2px -2px 5px rgba(255, 255, 255, .5), inset 2px 2px 4px rgba(255, 255, 255, .1), 2px 2px 8px rgba(0, 0, 0, .15)',

    },
    description: {
      width: '310px',
      'margin-top': '25px',
      display: 'flex',
      'flex-direction': 'column',
      'justify-content': 'space-between',
      'font-size': '10px',
      padding: '15px',
      'border-radius': '5px',
      'box-shadow': '-8px -8px 8px rgba(255, 255, 255, 1), -8px -8px 8px rgba(255, 255, 255, .5), inset 2px 2px 4px rgba(255, 255, 255, .1), 5px 5px 10px rgba(0, 0, 0, .15)'
    },
    type: {
      'font-size': '12px',
      'letter-spacing': '1.2px',
      'margin-bottom': '5px'
    }
  }));

  const classes = useStyles();

  let stars = [];
  for (let i = 0; i < starCount; i++) {
    stars.push(<img key={i} className={classes.levelStar} src={star}/>)
  }

  const view = isGameOver ? (
    <p style={{ color: theme.palette.primary.main }}>GG, Ya'll</p>
  ) : (
<div>
  <p style={{ color: theme.palette.primary.main }}>Game Instance: {props.name}</p>
  <p style={{ color: theme.palette.primary.main }}>{playerGoing}'s Turn</p>
  <Instructions/>
  <p style={{ color: theme.palette.primary.main }}>Cards Remaining: {currentDeckCount}/{totalDeckCount}</p>
  {userName === playerGoing ? (
          <Button variant="contained" color="primary" onClick={passTurn}>Pass Turn</Button>
        ) : null}
  <br/>
  <br/>
  <Slide direction="up" in={flip} mountOnEnter unmountOnExit style={{ color: theme.palette.primary.main }}>
    <Paper elevation={4} className={classes.paper}>
            {/* rip out */}
            <div className={classes.cardContainer}>
        <div className={classes.card}>
          <div className={classes.monsterName}>
            {card?.name}
          </div>
          <div className={classes.level}>
            {stars}
          </div>
          <div className={classes.monsterImage}>
            <img className={classes.monsterImage} src={card?.image}/>
          </div>
        <div className={classes.description}>
          <p className={classes.type}>[{card?.type}]</p>
          <p>{card?.question}</p>
        </div>
        </div>
        </div>
      {/* ** */}
      <div >
        {/* <li>{card?.type}</li> */}
        {/* <li>{card?.question}</li> */}
      </div>
    </Paper>
  </Slide>
</div>

  );

  return view;
};
