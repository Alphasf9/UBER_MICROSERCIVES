import http from 'http'
import app from './app.js'


const server = http.createServer(app);

server.listen(3001, () => {
    console.log('USER SERVICES are running on port 3001');
});