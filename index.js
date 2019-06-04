const express = require('express');
const bodyParser = require('body-parser');
const auth = require('./app/services/system/auth');

//Database
const db = require('./app/config/db.js');
// Database Authenticate
//db.sequelize.authenticate().then(() => {console.log('Database connected')}).catch((err) => {console.log(err.message)});

//Express
const app = express();
// Passport
app.use(auth.passport.initialize());
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
app.use('/api/auth', require('./app/routes/api/auth/authenticate.js'));
app.use('/api/upload', require('./app/routes/api/system/upload.js'));
app.use('/api/vendor', require('./app/routes/api/system/vendor.js'));

// Create a Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
