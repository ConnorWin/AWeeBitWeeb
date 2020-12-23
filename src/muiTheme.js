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
});

export { theme as default };
