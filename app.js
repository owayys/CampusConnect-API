const express = require('express');
const morgan = require('morgan');
require('./db');
require('dotenv').config();

const loginRouter = require('./routers/login')

const PORT = process.env.PORT;

const app = express();
app.use(morgan('dev'))
app.use(express.json())
app.use('/api', loginRouter)

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}...`)
})