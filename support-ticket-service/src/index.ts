import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import ticketRoutes from './routes/ticket.route';
import { authMiddleware } from './middleware/auth.middleware';

dotenv.config();
const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4002;

app.use('/ticket',authMiddleware, ticketRoutes);

mongoose
  .connect(process.env.MONGO_URI || '')
  .then(() => {
    app.listen(PORT, () => console.log(`User Service running on ${PORT}`));
  })
  .catch(err => console.error(err));
