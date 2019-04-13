import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCart from '@material-ui/icons/ShoppingCart';


const Header = ({ onClickHamburger }) => (
  <AppBar>
    <Toolbar>
      <Hidden mdUp implementation="css">
        <IconButton color="inherit" aria-label="Menu" onClick={onClickHamburger}>
          <MenuIcon />
        </IconButton>
      </Hidden>

      <Typography variant="h6" color="inherit" component={Link} to="/">
        Store
      </Typography>


      <IconButton color="inherit">
        <ShoppingCart />
      </IconButton>
    </Toolbar>
  </AppBar>
);

Header.propTypes = {
  onClickHamburger: PropTypes.func,
};

export default Header;
