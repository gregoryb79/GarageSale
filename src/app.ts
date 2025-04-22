import path from "path";
import express from "express";
import { json } from "body-parser";
import cookieParser from "cookie-parser";
import connectDB from './config/db';
import authRouter from './routers/auth.routes'
import notFound from './middlewares/notFound';
import errorHandler from "./middlewares/errorHandler";
import itemsRouter from './routers/items.routes';
import cartRouter from './routers/cart.routes';
import userRouter from './routers/users.routes'
import dotenv from 'dotenv';

dotenv.config();


export const app = express();

connectDB();
app.use((req, _, next) => {
    console.log(new Date(), req.method, req.url);
    next();
});

app.use(json());
app.use(cookieParser(process.env.SESSION_SECRET));

app.use('/api/auth', authRouter);
app.use('/api/items', itemsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/users', userRouter);
app.use(express.static(path.resolve(__dirname, "..", "public")));
app.use(notFound);
app.use(errorHandler);
