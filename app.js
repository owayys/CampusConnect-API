const express = require('express');
const morgan = require('morgan');

const cors = require('cors');
var connection = require('./db/index');
const http = require("http");
var socketio = require('socket.io')
require('dotenv').config();

const formatMessage = require('./util/message')
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require("./util/user")

const authRouter = require('./routers/auth')
const eventRouter = require('./routers/event')
const chatroomRouter = require('./routers/chatroom')
const groupRouter = require('./routers/group')
const schedRouter = require('./routers/schedule')
const courseRouter = require('./routers/course')
const friendRouter = require('./routers/friends')
const interestRouter = require('./routers/interests')

const PORT = process.env.PORT || 8080;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/event', eventRouter)
app.use('/api/chatroom', chatroomRouter)
app.use('/api/group', groupRouter)
app.use('/api/sched', schedRouter)
app.use('/api/course', courseRouter)
app.use('/api/friend', friendRouter)
app.use('/api/interest', interestRouter)

server.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}...`)

    if (connection.state === 'disconnected') {
        return respond(null, { status: 'fail', message: 'server down' });
    }
})

io.on("connection", (socket) => {
    console.log(io.of("/").adapter);
    
    socket.on("joinRoom", ({ username, room }) => {
        const user = userJoin(socket.id, username, room);

        socket.join(room);

        // Welcome current user
        socket.emit("message", formatMessage('bot', "Welcome to ChatCord!"));

        // Broadcast when a user connects
        socket.broadcast
            .to(room)
            .emit(
                "message",
                formatMessage('bot', `${username} has joined the chat`)
            );

        // Send users and room info
        io.to(user.room).emit("roomUsers", {
            room: user.room,
            users: getRoomUsers(user.room),
        });
    });

    socket.on("leaveRoom", ({ username, room }) => {
        socket.leave(room);
    });

    // Listen for chatMessage
    socket.on("chatMessage", ({ user, message, room }) => {
        // const user = getCurrentUser(socket.id);

        io.to(room).emit("message", formatMessage(user.username, message, room));
    });

    socket.on('location', (data) => {
        console.log(`Message received: ${data}`);
        socket.broadcast.emit('location', data);
    });

    // Runs when client disconnects
    socket.on("disconnect", () => {
        const user = userLeave(socket.id);

        if (user) {
            io.to(user.room).emit(
                "message",
                formatMessage('bot', `${user.username} has left the chat`)
            );

            // Send users and room info
            io.to(user.room).emit("roomUsers", {
                room: user.room,
                users: getRoomUsers(user.room),
            });
        }
    });
});

app.get('*', (req, res) => {
    res.status(404).json({ code: 404 });
});