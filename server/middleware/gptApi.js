const { Configuration, OpenAIApi } = require('openai');
const readlineSync = require('readline-sync');
require('dotenv').config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

function first1000Tokens(text) {
    const maxLength = 500;
    if (text.length > maxLength) {
        let trimmedText = text.substring(0, maxLength);
        let lastCurly = trimmedText.lastIndexOf('}');
        return trimmedText.substring(0, lastCurly + 1);
    }
    return text;
}

// Middleware function
async function analysisMiddleware(req, res, next) {
    const { insights, perspective, questionText } = req.body; 
    try {
        const insightsText = JSON.stringify(insights, getCircularReplacer());
        const limitedInsightsText = first1000Tokens(insightsText);
        const limitedInsights = JSON.parse(limitedInsightsText);

        const prompt = createPrompt(perspective, questionText, limitedInsights);
        const completion = await openai.createCompletion({
            model: "gpt-3.5-turbo",
            prompt: prompt,
            max_tokens: 500
        });

        if (completion) {
            req.analysisResult = formatResponseForFrontend(completion.data.choices[0].text); // Store the result in request object for further use in the next middleware
            next(); // Proceed to next middleware
        } else {
            throw new Error("Failed to get completion from OpenAI.");
        }
    } catch (error) {
        console.error("Error during API call or data handling:", error);
        let firstLineOfInsights = insights ? JSON.stringify(insights[0], null, 2) : "No insights available";
        // Prepare a detailed default message
        req.body.answer = `This response was intended to be a ChatGPT interpretation of the clustering results with a specifically engineered prompt based on the following parameters: \n\n- Perspective: ${perspective}\n- Question: ${questionText}\n- First Line of Insights: ${firstLineOfInsights}\n\nDue to an error, this detailed analysis could not be completed as expected. Please try again or contact support for more information.`;
        next(); // Proceed without passing the error to ensure the middleware chain continues smoothly        next(); // Proceed without passing the error to ensure the middleware chain continues smoothly
    }
}

function getCircularReplacer() {
    const seen = new WeakSet();
    return (key, value) => {
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
        }
        return value;
    };
}

function createPrompt(perspective, question, insights) {
    const insightsJson = JSON.stringify(insights, null, 2);
    return `**Analysis Request**
**Perspective**: ${perspective}
**Question**: ${question}
**Dataset Insights**:
\`\`\`
${insightsJson}
\`\`\`
Based on the provided insights and the specified perspective, please analyze the data and provide detailed recommendations.`;
}

function formatResponseForFrontend(responseText) {
    return {
        summary: summarizeResponse(responseText),
        recommendations: extractRecommendations(responseText),
        additionalInsights: extractAdditionalInsights(responseText)
    };
}

function summarizeResponse(text) {
    const endIndex = text.indexOf('.', 500);
    return endIndex !== -1 ? text.substring(0, endIndex + 1) : text;
}

function extractRecommendations(text) {
    const recommendationKeywords = ['recommend', 'suggest', 'advice', 'should', 'consider'];
    return text.split('. ').filter(sentence => recommendationKeywords.some(keyword => sentence.toLowerCase().includes(keyword))).join('. ');
}

function extractAdditionalInsights(text) {
    const insightKeywords = ['observe', 'note', 'insight', 'finding'];
    return text.split('. ').filter(sentence => insightKeywords.some(keyword => sentence.toLowerCase().includes(keyword))).join('. ');
}

module.exports = { analysisMiddleware }; // Export as middleware
