import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import Grid from '@material-ui/core/Grid';

import { Product } from '/client/models';
import ProductCard from './ProductCard';

const data = () => {
  const products = Product.find({}).fetch();
  return {
    products,
  };
};

const Home = ({ products }) => (
  <Grid container>
    {products.map(product => (
      <Grid item sm={6}>
        <ProductCard product={product} key={product._id} />
      </Grid>
    ))}
  </Grid>
);

Home.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
};

export default withTracker(data)(Home);
