import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';
import mongoose from 'mongoose';
import connectDB from './mongodbConnection/connect.js';
const app = express();
const port = process.env.PORT || 1000;
dotenv.config();

// Middleware__________________
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use('/api/post', postRoutes);
app.use('/api/dalle', dalleRoutes);

// ____________________________________
app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Hello from DALL.E!',
  });
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGO);
    app.listen(port, () => console.log('Server started on port ', port));
  } catch (error) {
    console.log(error);
  }
};

startServer();
