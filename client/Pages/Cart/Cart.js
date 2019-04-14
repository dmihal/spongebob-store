import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { ShoppingCart } from '/client/models';
import CartItem from './CartItem';

const data = () => {
  const items = ShoppingCart.find().fetch();
  return { items };
};

const Cart = ({ items }) => (
  <div>
    <Button onClick={() => ShoppingCart.remove({})}>Clear cart</Button>
    {items.map(item => <CartItem item={item} key={item._id} />)}
    {items.length === 0 && <Typography>Cart is empty </Typography>}
    <Button>Check Out</Button>
  </div>
);
Cart.propTypes = {
  items: PropTypes.array.isRequired,
};

export default withTracker(data)(Cart);
