import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';

import Header from './Header';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#283878',
    },
    secondary: {
      main: '#283878',
    },
  },
  typography: {
    fontFamily: ['"Source Sans Pro"', 'sans-serif'],

    title: {
      fontFamily: 'Cinzel, serif',
    },
    headline: {
      fontFamily: 'Cinzel, serif',
    },
  },
});

const styles = {
  content: {
    maxWidth: 800,
    display: 'flex',
    flexDirection: 'row',
    margin: '80px auto 0',
  },
};

const Layout = ({ children, classes }) => (
  <MuiThemeProvider theme={theme}>
    <Header />
    <div className={classes.content}>
      {children}
    </div>
  </MuiThemeProvider>
);

Layout.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Layout);