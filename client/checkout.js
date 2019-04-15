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
    this.request.addEventListener('shippingaddresschange', event => event.updateWith(this.updateShippingAddress()));
  }

  async show() {
    const response = await this.request.show();
    const serverResponse = await Meteor.callPromise('sendPaymentDetails', this.order._id, response);
    response.complete('success');
  }

  async updateShippingAddress() {
    const shippingOptions = await Meteor.callPromise(
      'getShippingOptions', this.request.shippingAddress.toJSON(), this.order._id
    );
    const paymentDetails = {
      total: {
        label: 'Total',
        amount: {
          currency: 'USD',
          value: 10,
        },
      },
      shippingOptions,
    };
    return paymentDetails;
  }
}

export async function startCheckout() {
  const order = await Meteor.callPromise('createOrder', ShoppingCart.find().fetch());
  const request = new PaymentRequest(paymentMethods, order.paymentDetails, paymentOptions);
  return new Checkout(order.doc, request);
}
