import { Meteor } from 'meteor/meteor';
import { Order, Product } from '../models';

function orderToPaymentDetails(order) {
  let total = 0;
  const paymentDetails = {
    displayItems: order.items.map((item) => {
      const product = Product.findOne(item.product);
      const price = parseFloat(product.price) * item.quantity;
      total += price;
      return {
        label: `${item.quantity}: ${product.name}`,
        amount: { currency: 'USD', value: price.toFixed(2) },
      };
    }),
    total: {
      label: 'Total due',
      amount: { currency: 'USD', value: total.toFixed(2), },
    },
  };
  return paymentDetails;
}

Meteor.methods({
  createOrder(cart) {
    cart.forEach((item) => {
      const product = Product.findOne(item._id);
      if (!product || item.quantity > product.stock) {
        throw new Meteor.Error('Invalid order');
      }
    });

    const orderId = Order.insert({
      items: cart.map(item => ({ product: item._id, quantity: item.quantity })),
    });

    return {
      doc: Order.findOne(orderId),
      paymentDetails: orderToPaymentDetails(Order.findOne(orderId)),
    };
  },
  getShippingOptions(address) {
    if (!address.country === 'US') {
      return [];
    }
    return [
      {
        id: 'economy',
        label: 'Free Economy Shipping (5-7 Days)',
        amount: { currency: 'USD', value: '0.00' },
      }, {
        id: 'express',
        label: 'Express Shipping (2-3 Days)',
        amount: { currency: 'USD', value: '5.00' },
      }, {
        id: 'next-day',
        label: 'Next Day Delivery',
        amount: { currency: 'USD', value: '12.00' },
      },
    ];
  },
});
