import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = {
  media: {
    objectFit: 'cover',
    height: 250,
  }
};

const ProductCard = ({ product, classes }) => (
  <Card className={classes.card}>
    <CardActionArea component={Link} to={`/details/${product._id}`}>
      <CardMedia
        component="img"
        className={classes.media}
        image={`/images/${product.image}`}
      />
      <CardContent>
        <Typography variant="h5" component="h2">
          {product.name}
        </Typography>
        <Typography gutterBottom variant="h6">
          $
          {product.price}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductCard);
