import React, { Component } from 'react';
import AuthContext from '../context/AuthContext';

export class Authentication extends Component {
    static contextType = AuthContext;
    state = {
        userName: '',
        userNameSet: false,
        authenticated: false,
        showWarning: false
    }
    
    setUserName = () => {
        if(!!this.state.userName && this.state.userName.length > 3) {
            this.setState({userNameSet: true, showWarning: false});
            this.context.login(this.state.userName)
        } else {
            this.setState({userNameSet: false, showWarning: true})
        }
    }



    handleChange = (event) => {
        this.setState({userName: event.target.value});
    }

    render () {
        let warning = this.state.showWarning ? (<h3>username must be more than 3 characters</h3>) : null;
        let login =
            <div>
            <input placeholder='User Name' type="text" value={this.state.userName} onChange={this.handleChange}/>
            <button onClick={this.setUserName}>Go</button>
            </div>

        return (
            <div>
                {warning}
                {login}
            </div>
        )
    }
}