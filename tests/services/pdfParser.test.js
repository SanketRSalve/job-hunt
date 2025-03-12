const path = require('path');
const fs = require('fs');
const pdfParser = require('../../src/services/pdfParser');

describe('PDF parsing service', () => {
 it('Should extract data from a valid resume pdf', async () => {
   const resumePath = path.join(__dirname, '../test-resumes', 'valid_resume.pdf');
   const resumeBuffer = fs.readFileSync(resumePath);
   const result = await pdfParser.parse(resumeBuffer);
   console.log(result);
   expect.objectContaining(result);
 });
});
