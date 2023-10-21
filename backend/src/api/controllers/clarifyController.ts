import { getSourceCode } from '../utils/hiroAPIUtil';
import { getGPTResponse } from '../utils/openaiUtil';
import { generatePrompt } from '../utils/openaiUtil';

export async function getContractAnalysis(req, res) {
    const contractId = req.body.contractId;
    const [contractAddress, contractName] = contractId.split('.');
    
    if (!contractAddress || !contractName) {
      res.status(400).send('Invalid contract ID format. Expected format: {contract address}.{contract name}');
      return;
    }
    
    try {
      const sourceCodeData = await getSourceCode(contractAddress, contractName);
      const prompt = generatePrompt(sourceCodeData.source);
      const gptResponse = await getGPTResponse(prompt);
      res.send(gptResponse);
    } catch (error) {
      console.error('Error fetching smart contract source code:', error);
      res.status(500).send('Internal server error');
    }
  }
