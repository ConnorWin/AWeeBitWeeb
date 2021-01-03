import React, { Fragment, useState } from "react";
import {Button} from '@material-ui/core'
import {vote} from '../api'
export const Vote = ({choices}) => {

    const handleVote = (choice) => {
        vote(choice)
    }

    const view = [...choices].map((choice) => 
    <Button onClick={handleVote} value={choice}>
        {choice}
    </Button>)

    return (
        <Fragment>
            {view}
        </Fragment>
    );
};
