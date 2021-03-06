import React, { useState, Fragment } from "react";
import AuthContext from "../context/AuthContext";
import { JoinGame } from "./JoinGame";
import { CreateGame } from "./CreateGame";
import {Button} from '@material-ui/core'
import theme from '../muiTheme';

export const LobbyConnect = (props) => {
  const { userName } = React.useContext(AuthContext);
  const initialState = {
    isJoiningGame: false,
    isCreatingGame: false,
  };
  const [state, setState] = useState(initialState);

  const connectToGame = (gameName) => {
    props.joinGame(gameName, userName, props.handleLobbyState);
    props.readyPlayer(gameName);
  };
  const createGame = (gameName) => {
    props.createGame(gameName, userName, props.handleLobbyState);
    props.readyPlayer(gameName);
  };

  let lobbyConnect;
  if (state.isJoiningGame) {
    lobbyConnect = <JoinGame connectToGame={connectToGame} />;
  } else if (state.isCreatingGame) {
    lobbyConnect = <CreateGame createGame={createGame} />;
  } else {
    lobbyConnect = (
      <Fragment>
        <Button
        variant="contained" color="primary"
          onClick={() => {
            setState({ isJoiningGame: true });
          }}
        >
          Join Game
        </Button>
        <Button
        variant="contained" color="primary"
          onClick={() => {
            setState({ isCreatingGame: true });
          }}
        >
          Create Game
        </Button>
      </Fragment>
    );
  }

  return (
    <div>
      <h1 style={{ color: theme.palette.secondary.main }}>Hello, {props.userName}</h1>
      {lobbyConnect}
    </div>
  );
};
