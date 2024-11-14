import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db/connect.js'
import postRouter from './routes/postRouter.js';
import authRouter from './routes/authRouter.js';
import cookieparser from 'cookie-parser';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieparser());
app.use(cors());
app.use('/', postRouter);
app.use('/', authRouter);

try{
    connectDB(process.env.CONNECTION_URL);
} catch (err) {
    console.log(err);
}

app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
})
