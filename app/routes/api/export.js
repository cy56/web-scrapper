const express = require('express');
const router = express.Router();
const controller = require('../../controllers/export');

router.post('/', controller.export);

module.exports = router;