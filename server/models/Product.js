import { Product } from '/models';

const products = [
  {
    name: 'Spongebob',
    price: '14.99',
    stock: 100,
    image: 'spongebob.jpg',
    description: 'Everybody\'s favorite amorphus sponge!',
  },
  {
    name: 'Patrick',
    price: '13.99',
    stock: 100,
    image: 'patrick.jpg',
    description: 'Spongebob\'s neighbor and best friend!',
  },
  {
    name: 'Sandy',
    price: '16.00',
    stock: 50,
    image: 'sandy.jpg',
    description: 'Sandy, the southern squirrel who is often quick to lend a helping hand to her friends in Bikini Bottom! Collect her and all of her silly-eyed friends!',
  },
  {
    name: 'Gary Beanie Baby',
    price: '39.89',
    stock: 20,
    image: 'gary.jpg',
    description: 'Faithful companion and pet extraordinaire, it\'s Gary the Snail, SpongeBob\'s favorite meowing mollusk.',
  }
];

if (Product.find().count() === 0) {
  products.forEach(product => Product.insert(product));
}
