const { createProduct, getAllProducts } = require('./src/services/productService');

const testProduct = {
  title: 'Test Product',
  price: 19.99,
  category: 'Test Category',
  image: 'test-image.jpg',
  description: 'This is a test product',
  sizes: ['S', 'M', 'L']
};

async function runTest() {
  try {
    console.log('Testing createProduct...');
    const createdProduct = await createProduct(testProduct);
    console.log('Created product:', JSON.stringify(createdProduct, null, 2));

    console.log('\nTesting getAllProducts...');
    const allProducts = await getAllProducts();
    console.log('Number of products:', allProducts.length);
    console.log('First product:', JSON.stringify(allProducts[0], null, 2));

    // Optional: clean up the test product
    // We don't have a delete function, so we'll skip for now.
    // You can manually delete it from the database if needed.

    process.exit(0);
  } catch (error) {
    console.error('Test failed:', error);
    process.exit(1);
  }
}

runTest();