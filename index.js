require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
//Database
const db = require('./app/services/database');
// Database Authenticate
//db.sequelize.authenticate().then(() => {console.log('Database connected')}).catch((err) => {console.log(err.message)});

//Express
const app = express();
// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

// Registry Routing
app.use('/api/auth', require('./app/routes/api/authenticate.js'));
app.use('/api/upload', require('./app/routes/api/upload.js'));
app.use('/api/vendor', require('./app/routes/api/vendor.js'));
app.use('/api/worker', require('./app/routes/api/worker.js'));

// Create a Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));