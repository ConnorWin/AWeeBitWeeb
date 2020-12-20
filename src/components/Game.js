import React, { useEffect, useState } from 'react';
import {listenForTurnStarting, endTurn} from '../api'
import AuthContext from '../context/AuthContext';

export const Game = (props) => {
  const { userName } = React.useContext(AuthContext);

  useEffect(() => {
    listenForTurnStarting(handleTurn)  
  })

  const initialState = {
    playerGoing: null,
    card: null
  }
  const [state, setState] = useState(initialState)

  const handleTurn = ({player, card}) => {
    setState({playerGoing: player, card})
  }

  return(
  <div>
    <li>{state.playerGoing}'s Turn</li>
    <li>{state.card?.type}</li>
    <li>{state.card?.question}</li>
    {userName === state.playerGoing ? <button>Pass Turn</button> : null}
  </div>
  )
}