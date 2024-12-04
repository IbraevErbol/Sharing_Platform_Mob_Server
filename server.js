import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url'; // Импортируем fileURLToPath
import { dirname } from 'path'; 

import userRoutes from './Routes/userRoutes.js'
import postRoutes from './Routes/postRoutes.js'
import { connectDB } from './config/db.js';

dotenv.config();

const PORT = 2000;
const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors({
  origin: 'exp://192.168.0.139:8081',
  credentials:true,
}))

app.use(express.json());
app.use(userRoutes);
app.use(postRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
connectDB()

app.listen(PORT, (err) => {
  err? console.log(err) : console.log(`Listening port ${PORT}`);;
})