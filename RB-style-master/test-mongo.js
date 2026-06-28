require('dotenv').config({ path: '.env.local' });
const { connectDB } = require('./src/lib/db');
const Product = require('./src/models/Product');

connectDB()
  .then(() => {
    console.log('Connected to MongoDB');
    return Product.find();
  })
  .then(products => {
    console.log('Number of products:', products.length);
    if (products.length > 0) {
      console.log('First product:', JSON.stringify(products[0], null, 2));
    } else {
      console.log('No products found in the database.');
    }
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });