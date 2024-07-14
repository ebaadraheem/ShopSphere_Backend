// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { config as configDotenv } from 'dotenv';
import favoriteRoutes from './routes/favoriteRoutes.js';
import dataRoutes from './routes/dataRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import imageRoutes from './routes/imageRoutes.js';
import historyRoutes from './routes/historyRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import checkoutRoutes from './routes/checkoutRoutes.js'

const app = express();
const port = 3000;

// env config
configDotenv();
app.use(express.json());
app.use(cors());

// Mongoose connection
let db = mongoose.connect(process.env.DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

try {
  await db;
  console.log('Connected to MongoDB');
} catch (error) {
  console.error('Error connecting to MongoDB:', error);
}

// Use routes
app.use('/favorites', favoriteRoutes);
app.use('/data', dataRoutes);
app.use('/orders', orderRoutes);
app.use('/history', historyRoutes);
app.use('/images', imageRoutes);
app.use('/contact', messageRoutes);
app.use('/checkout_session',checkoutRoutes)

app.get('/', (req, res) => {
  res.send('Shopsphere backend here');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
