import React, { useState } from "react";
import {Button, Dialog} from '@material-ui/core'
import theme from '../muiTheme'
export const Instructions = () => {

    const [isOpen, setIsOpen] = useState(false);

    const handleChange = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleChange}>Instructions</Button>
            <Dialog open={isOpen} onClose={handleChange}>
                <h4>Spill or Drink</h4>
                <p>Answer the question truthfully or take sips. Only applies to the reader unless otherwise indicated.</p>
                <h4>Most Likely To</h4>
                <p>Everyone vote for who fits the prompt the best. Most voted wins.</p>
                <h4>If this, then</h4>
                <p>These apply to all players. If the prompt applies to you, drink.</p>
                <h4>Would You Rather</h4>
                <p>Everyone vote on which you would rather do. Majority wins! Losers drink.</p>
                <h4>Trivia</h4>
                <p>The first to answer correctly gets to give out sips!</p>
            </Dialog>
        </div>
    );
};
