import { GoogleGenerativeAI } from "@google/generative-ai";
import Configs from "../configs.js";

export const getGeminiRes = async (prompt) => {
  try {
    console.log("got prompt=>>", prompt);

    const genAi = new GoogleGenerativeAI(Configs.GEMINI_KEY);
    const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });
    const response = await model.generateContent(prompt);
    console.log(response.response.text());

    // return response.response.text();
    return { status: true, data: response.response.text() };
  } catch (error) {
    console.log("i got error", error);
    return { status: false, error: error.message || "AI not available" };
  }
};
