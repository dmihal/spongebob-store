import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

const ShoppingCart = new Mongo.Collection(null);

Meteor.startup(function loadStoredCart() {
  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
    JSON.parse(storedCart).forEach(item => ShoppingCart.insert(item));
  }
});

const saveCart = () => setTimeout(
  () => localStorage.setItem('cart', JSON.stringify(ShoppingCart.find().fetch())), 10
);

ShoppingCart.find().observe({
  added: saveCart,
  changed: saveCart,
  removed: saveCart,
});

export default ShoppingCart;
