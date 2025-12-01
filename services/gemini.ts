import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini API client
let ai: GoogleGenAI | null = null;

export const initGemini = (apiKey: string) => {
  ai = new GoogleGenAI({ apiKey });
};

export const getGeminiTutorResponse = async (
  topic: string,
  userQuestion: string,
  context: string,
  apiKey?: string
): Promise<string> => {
  if (apiKey && !ai) {
    initGemini(apiKey);
  }

  if (!ai) {
    throw new Error("API Key missing");
  }

  try {
    // Model Selection based on complexity (defaulting to 2.5 flash for speed/cost)
    const model = "gemini-2.5-flash";
    
    // System instruction aligned with OpenPath "Guided Autonomy"
    const systemInstruction = `You are a Mentor for OpenPath, a zero-cost LMS for underprivileged engineering students.
    
    Current Student Context:
    - Topic: ${topic}
    - Phase: ${context}
    
    Philosophy: "Guided Autonomy". 
    - Do NOT give the full code solution immediately. 
    - Explain the "Why" and "How".
    - If they are stuck on a bug, ask for the error message or code snippet.
    - Be encouraging but rigorous.
    - Keep responses concise (under 200 words) to avoid "Tutorial Hell".
    
    If the user asks about something unrelated to tech, politely steer them back to ${topic}.`;

    const response = await ai.models.generateContent({
      model: model,
      contents: userQuestion,
      config: {
        systemInstruction: systemInstruction,
      },
    });

    return response.text || "I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to AI Tutor. Please check your API key.";
  }
};