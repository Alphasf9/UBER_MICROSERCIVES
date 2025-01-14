import express from 'express'
import morgan from 'morgan'
import captainRoutes from './routes/captain.routes.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connect from './db/db.js'


const app = express();

dotenv.config();

connect();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(morgan('dev'));

app.use('/', captainRoutes)


export default app;