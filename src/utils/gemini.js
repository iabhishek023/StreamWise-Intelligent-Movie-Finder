// src/utils/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_KEY);
export const geminiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });