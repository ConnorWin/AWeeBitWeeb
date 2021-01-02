import React, { useState } from "react";
import {Button} from '@material-ui/core'
import theme from '../muiTheme'
export const Voting = () => {

    const [isOpen, setIsOpen] = useState(false);

    const handleChange = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <div>
            <p style={{ color: theme.palette.secondary.main }}>Create Game</p>
            <CustomTextField label="Lobby Name" variant="outlined" onChange={handleChange} />
            <Button variant="contained" color="primary" onClick={() => props.createGame(state.gameName)}>Go</Button>
        </div>
    );
};