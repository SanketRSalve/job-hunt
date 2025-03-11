const cleanJsonString = (jsonString) => {
    try {
        // Trim whitespace and remove surrounding backticks
        const cleanedString = jsonString.trim().replace(/^```json|```$/g, '');

        // Parse and return valid JSON
        return JSON.parse(cleanedString);
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return null;
    }
};

module.exports = cleanJsonString;

