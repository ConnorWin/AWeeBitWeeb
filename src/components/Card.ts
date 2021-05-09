import React, { useState } from "react";
import {Button} from '@material-ui/core'
import CustomTextField from './customMaterial/CustomTextField'
import theme from '../muiTheme'
import { makeStyles } from '@material-ui/core/styles';
import {star, blueEyes} from '../static'

export const Card = ({card, starCount}) => {

const useStyles = makeStyles(function(theme) {

    const CardTypes ={
        SPILLORDRINK: 'Spill or Drink',
        DAREORDRINK: 'Dare or Drink',
        MOSTLIKELYTO: 'Most Likely To',
        CATEGORIES: 'Categories',
        IFTHISTHEN: 'If this, then',
        WOULDYOURATHER: 'Would You Rather',
        TRIVIA: 'Trivia'
    }

    let cardColor = null;

    switch(card?.type) {
        case CardTypes.SPILLORDRINK:
            cardColor = theme.cardTypes.orange;
            break;
        case CardTypes.DAREORDRINK:
            cardColor = theme.cardTypes.purple;
            break;
        case CardTypes.MOSTLIKELYTO:
            cardColor = theme.cardTypes.yellow;
            break;
        case CardTypes.CATEGORIES:
            cardColor = theme.cardTypes.blue;
            break;
        case CardTypes.IFTHISTHEN:
            cardColor = theme.cardTypes.green;
            break;
        case CardTypes.WOULDYOURATHER:
            cardColor = theme.cardTypes.white;
            break;
        case CardTypes.TRIVIA:
            cardColor = theme.cardTypes.fuchsia
            break;
    }

    return {
    cardContainer: {
        background: `${cardColor}`,
        color: 'black',
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
        'font-size': '24px',
        'letter-spacing': '1.5px',
        'border-radius': '5px',
        'box-shadow': '-8px -8px 8px rgba(0, 0, 0, .1), -8px -8px 8px rgba(0, 0, 0, .5), inset 2px 2px 4px rgba(0, 0, 0, .1), 5px 5px 10px rgba(0, 0, 0, .15)'
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
        'box-shadow': '-2px -2px 5px rgba(0, 0, 0, 1), -2px -2px 5px rgba(0, 0, 0, .5), inset 2px 2px 4px rgba(0, 0, 0, .1), 2px 2px 8px rgba(0, 0, 0, .15)',
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
        'box-shadow': '-2px -2px 5px rgba(0, 0, 0, 1), -2px -2px 5px rgba(0, 0, 0, .5), inset 2px 2px 4px rgba(0, 0, 0, .1), 2px 2px 8px rgba(0, 0, 0, .15)',

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
        'box-shadow': '-8px -8px 8px rgba(0, 0, 0, .1), -8px -8px 8px rgba(0, 0, 0, .5), inset 2px 2px 4px rgba(0, 0, 0, .1), 5px 5px 10px rgba(0, 0, 0, .15)'
    },
    type: {
        'font-size': '12px',
        'letter-spacing': '1.2px',
        'margin-bottom': '5px'
    }
    }});
    const classes = useStyles();

    let stars = [];
    for (let i = 0; i < starCount; i++) {
    stars.push(<img key={i} className={classes.levelStar} src={star}/>)
    }

return (
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
)
};
