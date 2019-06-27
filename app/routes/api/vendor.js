const express = require('express');
const app = express();
const router = express.Router();
const controller = require('../../controllers/vendor');
const jwtMiddleware = require('../../services/jwt');

// Add JWT Middleware
app.use(jwtMiddleware.verifyToken);

router.post('/rawsource', controller.getRawSource);

router.post('/datatable', controller.getDataTable);

module.exports = router;