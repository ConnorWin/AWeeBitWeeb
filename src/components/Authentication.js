import React, { useState } from "react";
import AuthContext from "../context/AuthContext";
import {Button} from '@material-ui/core'
import CustomTextField from './customMaterial/CustomTextField'
import { makeStyles } from '@material-ui/core/styles';
import {star, blueEyes} from '../static'

export const Authentication = () => {
  const { login } = React.useContext(AuthContext);
  const initialState = {
    userName: "",
    userNameSet: false,
    authenticated: false,
    showWarning: false,
  };
  const [state, setState] = useState(initialState);

  const setUserName = () => {
    if (!!state.userName && state.userName.length > 3) {
      setState({ userNameSet: true, showWarning: false });
      login(state.userName);
    } else {
      setState({ userNameSet: false, showWarning: true });
    }
  };

  const handleChange = (event) => {
    setState({ userName: event.target.value });
  };

  let warning = state.showWarning ? (
    <h3>username must be more than 3 characters</h3>
  ) : null;
  let loginView = (
    <div>
      <CustomTextField
        label="User Name"
        onChange={handleChange}
        variant="outlined"
      />
      <Button variant="contained" color="primary" onClick={setUserName}>Go</Button>
    </div>
  );

  //rip out
  const useStyles = makeStyles((theme) => ({
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
//*** */

  return (
    <div>
      {/* rip out */}
      <div className={classes.cardContainer}>
        <div className={classes.card}>
          <div className={classes.monsterName}>
            Booze Eyes Crunk Dragon
          </div>
          <div className={classes.level}>
            <img className={classes.levelStar} src={star}/>
            <img className={classes.levelStar} src={star}/>
            <img className={classes.levelStar} src={star}/>
            <img className={classes.levelStar} src={star}/>
            <img className={classes.levelStar} src={star}/>
            <img className={classes.levelStar} src={star}/>
            <img className={classes.levelStar} src={star}/>
          </div>
          <div className={classes.monsterImage}>
            <img className={classes.monsterImage} src={blueEyes}/>
          </div>
        <div className={classes.description}>
          <p className={classes.type}>[Most Likely Too]</p>
          <p>This legendary dragon is a powerful engine of destruction. Virtually invincible,
            very few have faced this awesome creature and lived to tell the tale.</p>
        </div>
        </div>
        </div>
      {/* ** */}
      {warning}
      {loginView}
    </div>
  );
};
