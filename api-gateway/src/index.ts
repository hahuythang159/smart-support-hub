import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authProxy from './routes/auth.route';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());

// Proxy route
app.use('/auth', authProxy);

app.listen(PORT, () => {
  console.log(`API Gateway is running at http://localhost:${PORT}`);
});
