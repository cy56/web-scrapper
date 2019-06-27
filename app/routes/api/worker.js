const express = require('express');
const router = express.Router();
const controller = require('../../controllers/worker');

router.post('/serve', controller.serve);

module.exports = router;