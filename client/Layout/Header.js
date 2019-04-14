import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ShoppingCart from '@material-ui/icons/ShoppingCart';

const style = {
  bar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 1000,
  },
  toolbar: {
    flexBasis: 800,
  },
  title: {
    flexGrow: 1,
    textDecoration: 'none',
  },
};

const Header = ({ classes }) => (
  <AppBar className={classes.bar}>
    <Toolbar className={classes.toolbar}>
      <Typography variant="h6" color="inherit" component={Link} to="/" className={classes.title}>
        Store
      </Typography>


      <IconButton color="inherit">
        <ShoppingCart />
      </IconButton>
    </Toolbar>
  </AppBar>
);

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(Header);
