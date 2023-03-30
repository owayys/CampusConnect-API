const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('./db');
require('dotenv').config();

const authRouter = require('./routers/auth')
const eventRouter = require('./routers/event')

const PORT = process.env.PORT;

const app = express();
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/event', eventRouter)

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}...`)
})