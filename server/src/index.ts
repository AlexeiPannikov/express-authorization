import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from "mongoose";
require('dotenv').config();
import authRouter from "./router/authRouter"
import {errorMiddleware} from "./middlewares/error-middleware";

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use('/api', authRouter);
app.use(errorMiddleware);

(async function start() {
    try {
        if (DB_URL) {
            await mongoose.connect(DB_URL)
        }
        app.listen(PORT, () => {
            console.log(`server start on port: ${PORT}`);
        })
    } catch (e) {
        console.log(e);
    }
})();
