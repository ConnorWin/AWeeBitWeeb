import React, { useState } from "react";
import AuthContext from "../context/AuthContext";
import {Button} from '@material-ui/core'
import CustomTextField from './customMaterial/CustomTextField'
import theme from '../muiTheme';

export const Authentication = () => {
  const { login } = React.useContext(AuthContext);
  const initialState = {
    userName: "",
    userNameSet: false,
    authenticated: false,
    showWarning: false,
  };
  const [state, setState] = useState(initialState);

  const setUserName = () => {
    if (!!state.userName && state.userName.length > 3) {
      setState({ userNameSet: true, showWarning: false });
      login(state.userName);
    } else {
      setState({ userNameSet: false, showWarning: true });
    }
  };

  const handleChange = (event) => {
    setState({ userName: event.target.value });
  };

  let warning = state.showWarning ? (
    <h3>username must be more than 3 characters</h3>
  ) : null;
  let loginView = (
    <div>
                  <h2 style={{ color: theme.palette.secondary.main }}>
              A Wee Bit Weeb
            </h2>
      <CustomTextField
        label="User Name"
        onChange={handleChange}
        variant="outlined"
      />
      <Button variant="contained" color="primary" onClick={setUserName}>Go</Button>
    </div>
  );
//*** */

  return (
    <div>
      {warning}
      {loginView}
    </div>
  );
};
