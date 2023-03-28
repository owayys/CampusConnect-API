const express = require('express');
const morgan = require('morgan');
require('./db');
require('dotenv').config();

const authRouter = require('./routers/auth')

const PORT = process.env.PORT;

const app = express();
app.use(morgan('dev'))
app.use(express.json())
app.use('/api/auth', authRouter)

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}...`)
})