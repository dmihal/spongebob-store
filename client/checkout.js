import { Meteor } from 'meteor/meteor';
import { ShoppingCart } from './models';

const paymentMethods = [
  {
    supportedMethods: 'basic-card',
    data: {
      supportedNetworks: [
        'visa', 'mastercard', 'amex', 'discover',
        'diners', 'jcb', 'unionpay'
      ]
    }
  }
];
const paymentOptions = {
  requestShipping: true,
  requestPayerEmail: true,
  requestPayerPhone: true,
  requestPayerName: true,
  shippingType: 'delivery',
};

class Checkout {
  constructor(order, request) {
    this.order = order;
    this.request = request;
  }

  async show() {
    const response = await this.request.show();
    const serverResponse = await Meteor.callPromise('sendPaymentDetails', this.order._id, response);
    response.complete('success');
  }
}

export async function startCheckout() {
  const order = await Meteor.callPromise('createOrder', ShoppingCart.find().fetch());
  const request = new PaymentRequest(paymentMethods, order.paymentDetails, paymentOptions);
  return new Checkout(order.doc, request);
}
