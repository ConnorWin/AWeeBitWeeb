import React, { useState } from "react";
import {Button, ButtonGroup} from '@material-ui/core'
import theme from '../muiTheme'
import {vote} from '../api';

export const Vote = ({votingOptions}) => {

    const handleChange = (event) => {
        vote(event.target.value)
    }
    return (
        <>
            <ButtonGroup onChange={handleChange}>
            {
                votingOptions.map(option => <Button value={option} variant="contained" color="secondary">{option}</Button>)
            }
            </ButtonGroup>
        </>
    );
};