import express from 'express';
import { Request, Response } from 'express';
import bodyParser from "body-parser";

import dotenv from "dotenv";
import cors from "cors";


dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());


// Route handlers
import authRoutes from './routes/auth';
import blockchainRoutes from './routes/blockchain';

app.use('/', authRoutes);
app.use('/blockchain', blockchainRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from the server!');
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 