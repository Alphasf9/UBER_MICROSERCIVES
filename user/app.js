import express from 'express'
import morgan from 'morgan'
import userRoutes from './routes/user.routes.js'
import dotenv from 'dotenv'
dotenv.config();
import cookieParser from 'cookie-parser'
import connect from './db/db.js'
import { connectToRabbitMq } from './service/rabbit.js';


const app = express();


connect();

connectToRabbitMq()


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(morgan('dev'));

app.use('/', userRoutes)


export default app;