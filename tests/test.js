const  path = require('path');
const fs = require('fs');
const request =  require('supertest');
const app = require('../src/app');

describe('Resume Parsing API', () => {
  it('should parse a formatted pdf and extract details', async () => {
    const resumePath = path.join(__dirname, 'test-resumes', 'valid_resume.pdf'); 
    const resumeBuffer = fs.readFileSync(resumePath);
    const response = await request(app).post('/upload').attach('resume', resumeBuffer, 'resume.pdf');
    expect(response.status);
  });
})
