import llm from "../config/llm.js";
import summaryPrompt from "../prompts/summaryPrompt.js";

export const summaryAgent = async (data) => {
    let response;
    try {
        const prompt = summaryPrompt(data)

        response = await llm.invoke(prompt)

        const raw = response?.content || "";
        const cleaned = raw
            .replace(/```json/gi, "")
            .replace(/```/g, "")
            .trim();

        const firstBrace = cleaned.indexOf('{');
        const lastBrace = cleaned.lastIndexOf('}');
        const jsonStr = (firstBrace !== -1 && lastBrace !== -1)
            ? cleaned.slice(firstBrace, lastBrace + 1)
            : cleaned;

        return JSON.parse(jsonStr)
    } catch (error) {
        console.log("Summary Agent Parse Error");
        console.log(response?.content ?? error.message);

        throw new Error("Failed to generate Summary");
        
    }
}