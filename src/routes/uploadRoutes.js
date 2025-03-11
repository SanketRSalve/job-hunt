const express = require('express');
const { uploadResume } = require('../controllers/uploadController');
const multer = require('multer');


const router = express.Router();
const upload = multer({ storage: multer.memoryStorage()});

router.post('/upload', upload.single('resume'), uploadResume);

module.exports = router;
