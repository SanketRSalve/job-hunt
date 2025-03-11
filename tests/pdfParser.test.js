//const path = require('path');
//const fs = require('fs');
//const pdfParser = require('../src/services/pdfParser');
//
//describe('PDF parsing service', () => {
//  it('Should extract data from a valid resume pdf', async () => {
//    const resumePath = path.join(__dirname, 'test-resumes', 'valid_resume.pdf');
//    const resumeBuffer = fs.readFileSync(resumePath);
//
//      const expectedResponse = {
//    "Name": "SANKET SALVE",
//    "Email": "sanket.r.salve@gmail.com",
//    "Skills": [
//      "Flutter", "Firebase", "Node.js", "Express.js", "Dart",
//      "JavaScript", "TypeScript", "SQL", "React.js", "Redux",
//      "Riverpod", "GoRouter", "MongoDB", "Docker", "GitHub Actions",
//      "AWS EC2", "Firebase Cloud Functions", "Git", "GitHub", "GitLab"
//    ],
//    "Work Experience": [
//      {
//        "Job Title": "Full Stack Developer",
//        "Company": "FreshPass",
//        "Years": "Oct 2023 - Present"
//      }
//    ]
//  };
//
//    const result = await pdfParser.parse(resumeBuffer);
//    console.log(result);
//    expect.objectContaining(result);
//  });
//});
