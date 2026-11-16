import llm from "../config/llm.js"
import hrInterviewPrompt from "../prompts/hrInterviewPrompt.js"
import technicalInterviewPrompt from "../prompts/technicalInterviewPrompt.js"



export const interviewAgent = async (data) => {

    let response;
    try {
        const prompt = data.type?.toLowerCase() === "hr" ? hrInterviewPrompt(data) : technicalInterviewPrompt(data)

        response = await llm.invoke(prompt)

        const raw = response.content || "";
        const cleaned = raw
            .replace(/```json/gi, "")
            .replace(/```/g, "")
            .trim();

        // Extract JSON array if surrounded by conversational text
        const firstBracket = cleaned.indexOf('[');
        const lastBracket = cleaned.lastIndexOf(']');
        const jsonStr = (firstBracket !== -1 && lastBracket !== -1)
            ? cleaned.slice(firstBracket, lastBracket + 1)
            : cleaned;

        return JSON.parse(jsonStr);
    } catch (error) {
        console.log("Interview Agent Parse Error");
        console.log(response?.content ?? error.message);

        throw new Error("Failed to generate interview questions.");
        
    }
}