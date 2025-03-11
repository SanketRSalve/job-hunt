const pdfParser = require('../services/pdfParser');

const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded'});
    }
    const extractedData = pdfParser.parse(req.file.buffer);
    console.log(extractedData);
    res.json({ success: true, data: extractedData});
  } catch (error) {
    console.error('Error parsing PDF:', error);
    res.status(500).json({ error: 'Internal Server Error'});
  }
};


module.exports  = { uploadResume };


