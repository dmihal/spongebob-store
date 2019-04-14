import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import Typography from '@material-ui/core/Typography';
import { Product } from '/client/models';

const data = ({ item }) => {
  const product = Product.findOne(item._id);
  return { product };
};

const CartItem = ({ item, product }) => {
  return (
    <div>
      <Typography>{product && product.name}</Typography>
      <Typography>Quantity: {item.quantity}</Typography>
    </div>
  );
};
CartItem.propTypes = {
  item: PropTypes.object.isRequired,
  product: PropTypes.object,
};

export default withTracker(data)(CartItem);
