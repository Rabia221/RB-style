import dotenv from 'dotenv';
import { connectDB } from './src/lib/db.js';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

connectDB()
  .then(() => {
    console.log('Database connection successful');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });