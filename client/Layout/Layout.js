import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';

import Header from './Header';
import Menu from './Menu';


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
  container: {
    maxWidth: 800,
  },
};

const Layout = ({ children, classes }) => (
  <MuiThemeProvider theme={theme}>
    <div className={classes.container}>
      <Header onClickHamburger={() => this.setState({ isDrawerOpen: true, })} />
      <Menu
        isOpen={false}
        onClose={() => this.setState({ isDrawerOpen: false, })}
      />
      <div className={classes.content}>
        {children}
      </div>
    </div>
  </MuiThemeProvider>
);

Layout.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Layout);
