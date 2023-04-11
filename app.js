const express = require('express');
const cors = require('cors');
require('dotenv').config();


const fileRoutes = require('./src/routes/fileRoutes')
const app = express();


// Middleware setup

// app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));


// Routes setup

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.use('/api', fileRoutes);


module.exports = app;