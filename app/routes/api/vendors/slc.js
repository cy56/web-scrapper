const express = require('express');
const router = express.Router();
const controller = require('../../../controllers/vendors/slc');

// Search by Params
router.post('/search', controller.findByParams);

// Retrieve a single record by Id
router.get('/:id', controller.findById);

module.exports = router;