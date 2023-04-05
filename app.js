const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
var connection = require('./db/index');
var socketio = require('socket.io')
require('dotenv').config();

const authRouter = require('./routers/auth')
const eventRouter = require('./routers/event')
const chatroomRouter = require('./routers/chatroom')

const PORT = process.env.PORT;

const app = express();
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/event', eventRouter)
app.use('/api/chatroom', chatroomRouter)

var server = app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}...`)

    if (connection.state === 'disconnected') {
        return respond(null, { status: 'fail', message: 'server down' });
    }
})

var io = socketio(server);

io.on("connection", socket => {
    console.log("a user connected :D");
    socket.on('message', (data) => {
        console.log(`Message received: ${data}`);
        socket.broadcast.emit('message', data);
    });    
});