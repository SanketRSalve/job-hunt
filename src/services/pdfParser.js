const pdfParse = require("pdf-parse");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cleanJsonString = require('../utils/cleanJsonString');
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const parse = async (pdfBuffer) => {
  try {
    // Get data buffer from PDF
    const result = await pdfParse(pdfBuffer);
    const text = result.text;

    //TODO: Function to extract skills might use ai for this
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
- name
- email
- skills (List)
- work_experience (job_title, company, years)

Resume Text:
"""${text}"""
`;

  const response = await model.generateContent(prompt);
  const aiOutput = response.response.text();
  const parsedData = cleanJsonString(aiOutput);
  return parsedData;
}
