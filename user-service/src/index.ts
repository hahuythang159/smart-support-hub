import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/users.routers'
import cors from 'cors';
import { createInitialUsers } from './services/createInitialUsers';
import { authMiddleware } from './middleware/auth.middleware';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', authMiddleware, userRoutes);

const PORT = process.env.PORT || 4000;
mongoose
  .connect(process.env.MONGO_URI || '')
  .then(() => {
    console.log('MongoDB connected successfully');
    createInitialUsers();
    app.listen(PORT, () => console.log(`User Service running on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
