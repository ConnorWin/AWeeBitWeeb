import React from 'react';
import {
    withStyles,
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import theme from '../../muiTheme';

const CustomTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: theme.palette.primary.main,
    },
    '& label': {
      color: theme.palette.primary.main,
    },
    '& input': {
      color: theme.palette.primary.main,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: theme.palette.primary.main,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.primary.main,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.primary.main,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
      },
    },
  },
})(TextField);

export { CustomTextField as default}