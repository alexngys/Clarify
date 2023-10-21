import { getSourceCode } from '../utils/hiroAPIUtil';
import { getGPTResponse } from '../utils/openaiUtil';
import { generateClarifyPrompt, generateSolidityConvertPrompt } from '../utils/promptUtil';

export async function getContractAnalysis(req, res) {
    const contractId = req.body.contractId;
    const [contractAddress, contractName] = contractId.split('.');

    console.log("Endpoint hit")
    
    if (!contractAddress || !contractName) {
      res.status(400).send('Invalid contract ID format. Expected format: {contract address}.{contract name}');
      return;
    }
    
    try {
      const sourceCodeData = await getSourceCode(contractAddress, contractName);
      const prompt = generateClarifyPrompt(sourceCodeData.source);
      const gptResponse = await getGPTResponse(prompt);
      res.send({ sourceCodeData, gptResponse });
    } catch (error) {
      console.error('Error fetching smart contract source code:', error);
      res.status(500).send('Internal server error');
    }
}

export async function convertToSolidity(req, res) {
    const contractId = req.body.contractId;
    const [contractAddress, contractName] = contractId.split('.');

    if (!contractAddress || !contractName) {
        res.status(400).send('Invalid contract ID format. Expected format: {contract address}.{contract name}');
        return;
    }

    try {
        const sourceCodeData = await getSourceCode(contractAddress, contractName);
        const prompt = generateSolidityConvertPrompt(sourceCodeData.source);
        const gptResponse = await getGPTResponse(prompt);
        res.send(gptResponse);
    } catch (error) {
        console.error('Error fetching smart contract source code:', error);
        res.status(500).send('Internal server error');
    }
};
