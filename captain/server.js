import http from 'http'
import app from './app.js'


const server = http.createServer(app);

server.listen(3002, () => {
    console.log('CAPTAIN SERVICES are running on port 3002');
});