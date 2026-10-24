

import 'dotenv/config';
import express from "express";
import authRouter from './auth/controller.js';
import morgan from 'morgan';

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))

app.use('/api/auth', authRouter);

app.listen(3000, () => console.log("This server is running on port 3000"));