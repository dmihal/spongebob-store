import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import { ShoppingCart } from '/client/models';
import { startCheckout } from '/client/checkout';
import CartItem from './CartItem';

const data = () => {
  const items = ShoppingCart.find().fetch();
  return { items };
};

const Cart = ({ items }) => {
  const [loading, setLoading] = useState(false);
  const _startCheckout = async () => {
    setLoading(true);
    const checkout = await startCheckout();
    checkout.show();
  };
  return (
    <div>
      <Button onClick={() => ShoppingCart.remove({})} disabled={loading}>Clear cart</Button>
      <List>
        {items.map(item => <CartItem item={item} key={item._id} />)}
      </List>
      {items.length === 0 && <Typography>Cart is empty </Typography>}
      <Button onClick={_startCheckout} disabled={loading}>Check Out</Button>
    </div>
  );
};
Cart.propTypes = {
  items: PropTypes.array.isRequired,
};

export default withTracker(data)(Cart);
