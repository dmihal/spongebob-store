import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import MenuItem from '@material-ui/core/MenuItem';

const MenuButtons = () => (
  <List>
    <MenuItem label="Wallet" to="/wallet" />
    <MenuItem label="Portfolio" to="/portfolio" />
    <MenuItem label="Transparency" to="/transparency" />
    <MenuItem label="Property" to="/property" />
  </List>
);

const Menu = ({ isOpen, onClose }) => (
  <Fragment>
    <Hidden mdUp>
      <Drawer
        variant="temporary"
        open={isOpen}
        onClose={onClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        <MenuButtons />
      </Drawer>
    </Hidden>

    <Hidden smDown implementation="css">
      <Drawer variant="permanent" open>
        <MenuButtons />
      </Drawer>
    </Hidden>
  </Fragment>
);

Menu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
};

export default Menu;
