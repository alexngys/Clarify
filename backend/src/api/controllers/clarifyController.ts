import axios from 'axios';
import OpenAI from 'openai';

require('dotenv').config();

export async function getContractAnalysis(req, res) {
    const contractId = req.body.contractId;
    const [contractAddress, contractName] = contractId.split('.');
    
    if (!contractAddress || !contractName) {
        res.status(400).send('Invalid contract ID format. Expected format: {contract address}.{contract name}');
        return;
    }
    
    try {
        const url = `https://api.mainnet.hiro.so/v2/contracts/source/${contractAddress}/${contractName}?proof=0`;
        const response = await axios.get(url);
        const sourceCode = response.data;

        const prompt = `
            Clarity Smart Contract Analysis

            Contract Source Code:
            \`\`\`
            ${sourceCode.source}
            \`\`\`

            Instructions:
            - Provide a detailed overview of the smart contract.
            - Explain the purpose and functionality of each public function found within the contract.
            - Describe how one would interact with this contract, including any prerequisites or setup required.
            - Identify any notable security considerations or potential optimizations.
            - Offer insight on how data is managed and stored within the contract.
            - Any additional relevant information regarding contract interaction, state management, or design patterns employed.
        `;


        const apikey = process.env.REACT_APP_OPENAI_API_KEY;
        const openai = new OpenAI({apiKey: apikey,});
        const gptResponse = await openai.chat.completions.create({messages: [{ role: "user", content: prompt }],
        model: "gpt-4",})

        res.send(gptResponse);
    } catch (error) {
        console.error('Error fetching smart contract source code:', error);
        res.status(500).send('Internal server error');
    }
}
