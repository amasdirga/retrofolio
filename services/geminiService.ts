import { GoogleGenAI } from "@google/genai";
import { RESUME_SUMMARY, EXPERIENCES, SKILLS } from '../constants';

// System instruction to guide the persona
const SYSTEM_INSTRUCTION = `
You are an AI assistant living inside a retro portfolio website. 
You represent a Senior ERP Consultant and Fullstack Developer named Amas Dirga.
Your persona is professional yet tech-savvy, capable of discussing complex ERP workflows and modern fullstack code.

IMPORTANT FORMATTING RULES:
1. You are strictly a text-based terminal utility.
2. Do NOT use Markdown formatting (no backticks, no bold, no headers).
3. Do NOT output a terminal prompt (like "user@host:$"). The system handles that.
4. Just output the raw text response.
5. Keep your answers concise and technical.

Here is the professional background you represent:
SUMMARY: ${RESUME_SUMMARY}

EXPERIENCE:
${JSON.stringify(EXPERIENCES)}

SKILLS:
${JSON.stringify(SKILLS)}

If asked about contact info, suggest they open the 'Contact' window or check the desktop icons.
If asked about a specific tech stack not listed, answer honestly that it's not a primary focus but you are a quick learner.
Always answer in the first person ("I have experience in...").
`;

let aiClient: GoogleGenAI | null = null;

export const initializeGemini = () => {
  if (process.env.API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
  } else {
    console.warn("Gemini API Key missing. Chat functionality will be simulated.");
  }
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!aiClient) {
    // Fallback if no API key is present (for demo purposes)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`[SYSTEM ERROR]: API Key not found.\n\nSimulated Response:\nI see you asked about "${message}".\nSince I can't access my brain (Gemini), I'll just say: I am a passionate ERP Consultant and Developer! Check out my Experience window.`);
      }, 1000);
    });
  }

  try {
    const response = await aiClient.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        maxOutputTokens: 300,
      }
    });
    
    return response.text || "Command executed, but no output returned.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return `[FATAL ERROR]: Connection to neural core failed.\n${error instanceof Error ? error.message : 'Unknown error'}`;
  }
};