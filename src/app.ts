

import 'dotenv/config';
import express from "express";

import authRouter from './auth/controller.js';
import conversationsRouter from './conversations/controller.js';

import morgan from 'morgan';
import { errorBoundary } from './middlewre/errorBoundary.js';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))
app.use(cookieParser());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/conversations', conversationsRouter);



// Error Boundary 
app.use(errorBoundary);

app.listen(3000, () => console.log("This server is running on port 3000"));