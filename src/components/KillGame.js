import React, {} from "react";
import {Button} from '@material-ui/core'
import {killGame} from '../api';

export const KillGame = (props) => {

    return (
    <div>
        <Button variant="contained" color="primary" onClick={killGame}>Kill Current Game</Button>
    </div>
    );
};
