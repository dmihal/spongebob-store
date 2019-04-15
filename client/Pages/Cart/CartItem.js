import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Delete from '@material-ui/icons/Delete';
import { Product, ShoppingCart } from '/client/models';

const data = ({ item }) => {
  const product = Product.findOne(item._id);
  return { product };
};

const CartItem = ({ item, product }) => {
  const total = product ? (parseFloat(product.price) * item.quantity).toFixed(2) : null;
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar src={product && `/images/${product.image}`} />
      </ListItemAvatar>
      <ListItemText
        primary={<Link to={`/product/${item._id}`}>{product && product.name}</Link>}
        secondary={(
          <Fragment>
            Quantity: {item.quantity} {total && ` — Total: $${total}`}
          </Fragment>
        )}
      />
      <ListItemSecondaryAction>
        <IconButton onClick={() => ShoppingCart.remove(item._id)}>
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
CartItem.propTypes = {
  item: PropTypes.object.isRequired,
  product: PropTypes.object,
};

export default withTracker(data)(CartItem);
