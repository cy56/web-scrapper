const express = require('express');
const router = express.Router();
const controller = require('../../../controllers/vendor');

// Search by Params
router.post('/search', controller.findByParams);

module.exports = router;