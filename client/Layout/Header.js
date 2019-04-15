import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { ShoppingCart } from '/client/models';

const data = () => {
  const cartItems = ShoppingCart.find().count();
  return { cartItems };
};

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

const Header = ({ classes, cartItems }) => (
  <AppBar className={classes.bar}>
    <Toolbar className={classes.toolbar}>
      <Typography variant="h6" color="inherit" component={Link} to="/" className={classes.title}>
        Store
      </Typography>


      <IconButton color="inherit" component={Link} to="/cart">
        <Badge badgeContent={cartItems} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Toolbar>
  </AppBar>
);

Header.propTypes = {
  cartItems: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(withTracker(data)(Header));
