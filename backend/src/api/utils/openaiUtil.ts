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

export function generatePrompt(sourceCode: string) {
    const prompt = `
        Clarity Smart Contract Analysis

        Contract Source Code:
        \`\`\`
        ${sourceCode}
        \`\`\`

        Instructions:
        - Provide a detailed overview of the smart contract.
        - Explain the purpose and functionality of each public function found within the contract.
        - Describe how one would interact with this contract, including any prerequisites or setup required.
        - Identify any notable security considerations or potential optimizations.
        - Offer insight on how data is managed and stored within the contract.
        - Any additional relevant information regarding contract interaction, state management, or design patterns employed.
    `;
    return prompt;
  }
  
