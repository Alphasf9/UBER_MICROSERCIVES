import express from 'express';
import morgan from 'morgan';
import expressProxy from 'express-http-proxy'

const app = express();


app.use('/user', expressProxy('http://localhost:3001'));

app.use(express.json());
app.use(morgan('dev'));



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Gateway server is running on port ${PORT}`);
});

