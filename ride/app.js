import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
dotenv.config();
import connect from './db/db.js'
import cookieParser from 'cookie-parser'
import rideRoutes from './routes/ride.routes.js'
import {connectToRabbitMq} from './service/rabbit.js'


connect()


connectToRabbitMq()


const app = express();




app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(morgan('dev'));


app.use('/',rideRoutes)



export default app;