const scrapeJobs = require('../services/jobScrape');
const pdfParser = require('../services/pdfParser');

const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    // Parse Resume PDF
    const extractedData = await pdfParser.parse(req.file.buffer);
    
    // Extract Skills
    const skills = extractedData.skills || [];
    
    // Run Scraper function with the skills
    const jobListings = await scrapeJobs(skills.slice(0, 3));
    
    res.json({ 
      success: true, 
      data: extractedData, 
      jobs: jobListings
    });
    
  } catch (error) {
    console.error('Error parsing PDF:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { uploadResume };