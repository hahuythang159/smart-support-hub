import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authProxy from './routes/auth.route';
import ticketProxy from './routes/ticket.route';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());

// Proxy route
app.use('/auth', authProxy);

app.use('/ticket', ticketProxy);


app.listen(PORT, () => {
  console.log(`API Gateway is running at on ${PORT}`);
});
