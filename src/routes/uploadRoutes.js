const express = require('express');
const { uploadResume } = require('../controllers/uploadController');
const multer = require('multer');


const router = express.Router();

// Store the uploaded file in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage});

// Accept Single Resume PDF file
router.post('/upload', upload.single('resume'), uploadResume);

module.exports = router;
