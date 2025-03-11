const pdfParse = require("pdf-parse");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cleanJsonString = require('../utils/cleanJsonString');
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const parse = async (pdfBuffer) => {
  try {
    const result = await pdfParse(pdfBuffer);

    // Extract skills, experience
    // TODO: Add AI for this later
    const text = result.text;
    const response = await extractSkills(text);
    return response;
  } catch (error) {
    console.error("PDF Parsing Failed", error);
    throw new Error("Failed to parse PDF");
  }
};

module.exports = { parse };

async function extractSkills(text) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `
Extract the following structured details from the resume give json data:
- Name
- Email
- Skills (List)
- Work Experience (Job Title, Company, Years)

Resume Text:
"""${text}"""
`;

  const response = await model.generateContent(prompt);
  const aiOutput = response.response.text();
  const parsedData = cleanJsonString(aiOutput);
  return parsedData;
}

module.exports = {parse};



