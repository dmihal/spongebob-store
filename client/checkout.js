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
    this.shippingOptions = [];
    this.request.addEventListener('shippingaddresschange', event => event.updateWith(this.updateShippingAddress()));
    this.request.addEventListener('shippingoptionchange', event => event.updateWith(this.updateShippingMethod()));
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
    this.shippingOptions = shippingOptions;
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

  async updateShippingMethod() {
    let total = this.order.subtotal;
    this.shippingOptions.forEach((option) => {
      option.selected = option.id === this.request.shippingOption;
      total += option.selected ? parseFloat(option.amount.value) : 0;
    });
    return {
      total: {
        label: 'Total due',
        amount: { currency: 'USD', value: total.toFixed(2), },
      },
      shippingOptions: this.shippingOptions,
    };
  }
}

export async function startCheckout() {
  const order = await Meteor.callPromise('createOrder', ShoppingCart.find().fetch());
  const request = new PaymentRequest(paymentMethods, order.paymentDetails, paymentOptions);
  return new Checkout(order.doc, request);
}
