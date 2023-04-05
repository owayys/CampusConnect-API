const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
var connection = require('./db/index');
require('dotenv').config();

const authRouter = require('./routers/auth')
const eventRouter = require('./routers/event')
const groupRouter = require('./routers/group')

const PORT = process.env.PORT;

const app = express();
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/event', eventRouter)
app.use('/api/group', groupRouter)

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}...`)

    if(connection.state === 'disconnected'){
        return respond(null, { status: 'fail', message: 'server down'});
    }
})