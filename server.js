const express = require('express');
const connectDb = require('./config/dbConnection');
const errorHandler = require('./middleware/errorHandler');
const dotenv = require('dotenv').config();

connectDb();
const app = express();

const port = process.env.PORT;

//json parser for client data
app.use(express.json());
app.use('/api/employee', require('./routes/employeeRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use(errorHandler);

app.listen(port, ()=>{});

