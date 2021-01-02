import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ffc100',
    },
    secondary: {
      main: '#9a0056',
    },
    neutral: {
      main: '#580069',
    },
    default: {
      main: '#11007e',
    },
    defaultSecondary: {
      main: '#003287',
    },
  },
  cardTypes: {
    orange: '#c67b42',
    purple: '#5e4962',
    yellow: '#a37c38',
    blue: '#6f8fbc',
    green: '#31878e',
    white: '#dad5c9',
    fuchsia: '#a63b77',
  },
});

export { theme as default };
