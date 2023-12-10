const express = require('express');
const http = require('http');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const socketIo = require('socket.io');
require('./config/database');

//set the port for the app
app.set('port', process.env.PORT || 3000);

//enable CORS configuration
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

//configure middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: './uploads',
}));

//define routes
app.use('/api', require('./routes/index'));
app.use('/tickets', require('./routes/ticket'));
app.use('/inventory', require('./routes/inventory'));
app.use('/FAQs', require('./routes/FAQ'));
app.use('/dashboard', require('./routes/dashboard'));

//create an HTTP server
const server = http.createServer(app);

//create a WebSocket server
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST'],
    credentials: true,
  }
});

//define WebSocket event handlers
io.on('connection', (socket) => {
  console.log('A user connected to the WebSocket');

  socket.on('newTicket', (ticketData) => {
    io.emit('adminNotification', ticketData);
  });

  socket.on('changedTicketStatus', (ticketData) =>{
    io.emit('userNotification', ticketData)
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected from the WebSocket');
  });
});

//start the server and listen on the port
server.listen(app.get('port'));
console.log('Server on port', app.get('port'));
