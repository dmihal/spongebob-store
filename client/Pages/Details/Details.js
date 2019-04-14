import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Product, ShoppingCart } from '/client/models';

const style = {
  img: {
    maxHeight: 200,
  },
  purchase: {
    float: 'right',
    padding: 10,
    margin: 10,
  },
};
const data = ({ match }) => {
  const product = Product.findOne(match.params.id);
  const cartItem = product ? ShoppingCart.findOne(product._id) : null;
  return { product, cartItem };
};

const Details = ({ product, cartItem, classes }) => {
  if (!product) {
    return null;
  }
  const [quantity, setQuantity] = useState(cartItem ? cartItem.quantity : 0);
  return (
    <Fragment>
      <Typography variant="h2">{product.name}</Typography>
      <Paper className={classes.purchase}>
        <Typography variant="h5">${product.price}</Typography>
        {cartItem && (
          <Typography>In cart: {cartItem.quantity}</Typography>
        )}
        <input type="number" value={quantity} min="0" onChange={e => setQuantity(e.target.value)} />
        <Button onClick={() => ShoppingCart.upsert(product._id, { quantity, _id: product._id })}>
          {cartItem ? 'Update cart' : 'Add to cart'}
        </Button>
      </Paper>
      <div>
        <img src={`/images/${product.image}`} alt={product.name} className={classes.img} />
      </div>
      <Typography>{product.description}</Typography>
    </Fragment>
  );
};

Details.propTypes = {
  product: PropTypes.object,
  cartItem: PropTypes.object,
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(withTracker(data)(Details));
