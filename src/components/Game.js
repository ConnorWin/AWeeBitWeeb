import React, { useEffect, useState } from "react";
import { listenForTurnStarting, endTurn, listenForGameEnding } from "../api";
import AuthContext from "../context/AuthContext";
import {Button} from '@material-ui/core'
import theme from '../muiTheme'
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import {Instructions} from './Instructions';
import {Card} from './Card';
import { Vote } from "./Vote";
import { CardTypes } from "../models/Card";

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
    setTimeout(() => {
      endTurn();
      setFlip(prev => !prev)
    }, 1000)
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
  { card?.type === CardTypes.MOSTLIKELYTO || card?.type === CardTypes.WOULDYOURATHER ?   <Vote votingOptions={card.votingOptions}/> : null}
  <Slide direction="up" in={flip} mountOnEnter unmountOnExit style={{ color: theme.palette.primary.main }}>
    <Paper elevation={4} style={{zIndex: 1, width: '390px'}}>
      <Card card={card} starCount={starCount}/>
    </Paper>
  </Slide>
</div>

  );

  return view;
};
