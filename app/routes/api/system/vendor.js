const express = require('express');
const router = express.Router();
const controller = require('../../../controllers/vendor');

// Search by Params
router.post('/rawsource', controller.getRawSource);

router.post('/datatable', controller.getDataTable);

module.exports = router;