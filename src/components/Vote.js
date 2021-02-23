import React, { useState } from "react";
import {Button, ButtonGroup} from '@material-ui/core'
import theme from '../muiTheme'
import {vote} from '../api';

export const Vote = ({votingOptions}) => {
    const [hasVoted, setHasVoted] = useState(false);
    const handleChange = (event) => {
        vote(event)
        setHasVoted(()=> !hasVoted)
    }

    const view = votingOptions.map(option => <Button value={option} variant="contained" color="secondary" onClick={() => handleChange(option)}>{option}</Button>)
    return (
        <>
            {
                !hasVoted ? view : null
            }
        </>
    );
};