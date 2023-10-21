import OpenAI from 'openai';
require('dotenv').config();

const apikey = process.env.REACT_APP_OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: apikey });

export async function getGPTResponse(prompt: string) {
  const gptResponse = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-4",
  });
  return gptResponse;
}