import React, { useState } from 'react';
import AuthContext from '../context/AuthContext';

export const Authentication = () => {
    const { login } = React.useContext(AuthContext);
    const initialState = {
        userName: '',
        userNameSet: false,
        authenticated: false,
        showWarning: false
    }
    const [state, setState] = useState(initialState)
    
    const setUserName = () => {
        if(!!state.userName && state.userName.length > 3) {
            setState({userNameSet: true, showWarning: false});
            login(state.userName)
        } else {
            setState({userNameSet: false, showWarning: true})
        }
    }



    const handleChange = (event) => {
        setState({userName: event.target.value});
    }

    let warning = state.showWarning ? (<h3>username must be more than 3 characters</h3>) : null;
    let loginView = (
        <div>
        <input placeholder='User Name' type="text" value={state.userName} onChange={handleChange}/>
        <button onClick={setUserName}>Go</button>
        </div>)
    return (
            <div>
                {warning}
                {loginView}
            </div>
    )
}