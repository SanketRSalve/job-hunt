const cleanJsonString = require('../../src/utils/cleanJsonString');

test('cleaning response from GEMINI', () => {
  const testData = `\`\`\`json
  {
    "Name": "SANKET SALVE",
    "Email": "sanket.r.salve@gmail.com",
    "Skills": [
      "Flutter", "Firebase", "Node.js", "Express.js", "Dart",
      "JavaScript", "TypeScript", "SQL", "React.js", "Redux",
      "Riverpod", "GoRouter", "MongoDB", "Docker", "GitHub Actions",
      "AWS EC2", "Firebase Cloud Functions", "Git", "GitHub", "GitLab"
    ],
    "Work Experience": [
      {
        "Job Title": "Full Stack Developer",
        "Company": "FreshPass",
        "Years": "Oct 2023 - Present"
      }
    ]
  }
  \`\`\``;

  const expectedResponse = {
    "Name": "SANKET SALVE",
    "Email": "sanket.r.salve@gmail.com",
    "Skills": [
      "Flutter", "Firebase", "Node.js", "Express.js", "Dart",
      "JavaScript", "TypeScript", "SQL", "React.js", "Redux",
      "Riverpod", "GoRouter", "MongoDB", "Docker", "GitHub Actions",
      "AWS EC2", "Firebase Cloud Functions", "Git", "GitHub", "GitLab"
    ],
    "Work Experience": [
      {
        "Job Title": "Full Stack Developer",
        "Company": "FreshPass",
        "Years": "Oct 2023 - Present"
      }
    ]
  };

  const result = cleanJsonString(testData);
  expect(result).toEqual(expectedResponse);
});

