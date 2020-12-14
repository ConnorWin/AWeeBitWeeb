import React, { Component, Fragment } from 'react';
import AuthContext from '../context/AuthContext';
import {JoinGame} from './JoinGame';
import {CreateGame} from './CreateGame';
import styles from './Home.module.css';

export class LobbyConnect extends Component {
    static contextType = AuthContext;
    state = {
        isJoiningGame: false,
        isCreatingGame: false
    }

    connectToGame = (gameName) => {
        console.log(`connecting to ${gameName}`)
        this.props.joinGame(gameName, this.context.userName, this.props.handleLobbyState)
        this.props.readyPlayer(gameName)
    }
    createGame = (gameName) => {
        console.log(`creating ${gameName}`)
        this.props.createGame(gameName, this.context.userName, this.props.handleLobbyState)
        this.props.readyPlayer(gameName)
    }

    render () {
        let lobbyConnect;
        if (this.state.isJoiningGame) {
            lobbyConnect = <JoinGame connectToGame={this.connectToGame}/>
        } else if (this.state.isCreatingGame) {
            lobbyConnect = <CreateGame createGame={this.createGame}/>
        } else {
            lobbyConnect = (
            <Fragment>
                <button onClick={() => {this.setState({isJoiningGame: true})}}>Join Game</button>
                <button onClick={() => {this.setState({isCreatingGame: true})}}>Create Game</button>
            </Fragment>
            );
        }
        return (
            <div>
                <h1 className={styles.Hi}>Hello, {this.props.userName}</h1>
                {lobbyConnect}
            </div>
        )
    }
}