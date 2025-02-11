import { GoogleGenerativeAI } from "@google/generative-ai";
import Configs from "../configs.js";
import { Client } from "@opensearch-project/opensearch";
import { v4 as uuidv4 } from "uuid";
const client = new Client({ node: "http://localhost:9200" });

import UserSchema from "../modules/users/model.js";
export const getGeminiRes = async (prompt) => {
  try {
    console.log("got prompt=>>", prompt);

    const genAi = new GoogleGenerativeAI(Configs.GEMINI_KEY);
    const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });
    const response = await model.generateContentStream(prompt);
    console.log(response.response.text());

    // return response.response.text();
    return { status: true, data: response.response.text() };
  } catch (error) {
    console.log("i got error", error);
    return { status: false, error: error.message || "AI not available" };
  }
};

export const openSearch = async () => {
  try {
    const allContacts = await UserSchema.findAll({});
    const contactJson = allContacts.map((user) => user.toJSON());
    console.log("allContacts", contactJson);

    client.index({
      index: "user-records",
      id: '2299-users',
      body: contactJson,
    });
  } catch (error) {
    console.log("i got error", error);
  }
};
