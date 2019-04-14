import { Product } from '/models';

const products = [
  {
    name: 'Spongebob',
    price: '14.99',
    stock: 100,
    image: 'spongebob.jpg',
    description: 'Everybody\'s favorite amorphus sponge!',
  },
];

if (Product.find().count() === 0) {
  products.forEach(product => Product.insert(product));
}
