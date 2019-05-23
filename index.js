const express = require('express');
const bodyParser = require('body-parser');

//Database
const db = require('./app/config/db.js');
// Database Authenticate
db.sequelize.authenticate().then(() => {console.log('Database connected')}).catch((err) => {console.log(err.message)});

//Express
const app = express();
// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));

// Registry Routing
app.use('/api/vendors/gd', require('./app/routes/api/vendors/gd.js'));
app.use('/api/vendors/cmd', require('./app/routes/api/vendors/cmd.js'));

// Create a Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
