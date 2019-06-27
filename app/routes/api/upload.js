const express = require('express');
const multer = require('multer');
const router = express.Router();
const upload = multer({ dest: '/tmp/csv' });
const controller = require('../../controllers/upload');

router.post('/', upload.single('file'), controller.upload);

module.exports = router;