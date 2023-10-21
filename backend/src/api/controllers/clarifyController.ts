import { getClaritySourceCode } from '../utils/hiroAPIUtil';
import { getGPTResponse } from '../utils/openaiUtil';
import { generateClarifyPrompt, 
    generateSolidityConvertPrompt, 
    generateClarityConvertPrompt, 
    extractSolidityCodeAndExplanation,
    extractClarityCodeAndExplanation,
    generateAuditPrompt
 } from '../utils/promptUtil';
import { deployToStacks } from '../utils/deployToStacks';
import { getSoliditySourceCode } from '../utils/etherscanAPIUtil';

export async function getContractAnalysis(req, res) {
    const contractId = req.body.contractId;
    const [contractAddress, contractName] = contractId.split('.');

    console.log("Endpoint hit")
    
    if (!contractAddress || !contractName) {
      res.status(400).send('Invalid contract ID format. Expected format: {contract address}.{contract name}');
      return;
    }
    
    try {
      const sourceCodeData = await getClaritySourceCode(contractAddress, contractName);
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
        const sourceCodeData = await getClaritySourceCode(contractAddress, contractName);
        const prompt = generateSolidityConvertPrompt(sourceCodeData.source);
        const gptResponse = await getGPTResponse(prompt);

        console.log(gptResponse.choices[0].message.content)

        const { solidityCode, explanation } = extractSolidityCodeAndExplanation(gptResponse.choices[0].message.content)

        res.send({sourceCodeData, solidityCode, explanation});
    } catch (error) {
        console.error('Error fetching smart contract source code:', error);
        res.status(500).send('Internal server error');
    }
};

export async function convertToClarity(req, res) {
    const contractAddress = req.body.contractAddress;

    if (!contractAddress) {
        res.status(400).send('No contract address provided...');
        return;
    }

    try {
        const sourceCodeData = await getSoliditySourceCode(contractAddress);
        const prompt = generateClarityConvertPrompt(sourceCodeData);
        const gptResponse = await getGPTResponse(prompt);

        console.log(gptResponse.choices[0].message.content)

        const { clarityCode, explanation } = extractClarityCodeAndExplanation(gptResponse.choices[0].message.content)

        console.log(clarityCode)
        console.log(explanation)

        res.send({sourceCodeData, clarityCode, explanation});
    } catch (error) {
        console.error('Error fetching smart contract source code:', error);
        res.status(500).send('Internal server error');
    }
};

export async function getAuditReport(req, res) {
    const contractCode = req.body.contractCode;
  
    console.log("Endpoint hit");
  
    if (!contractCode) {
      res.status(400).send("Invalid");
      return;
    }
  
    try {
      const prompt = generateAuditPrompt(contractCode);
      const gptResponse = await getGPTResponse(prompt);
      console.log(gptResponse.choices[0].message.content);
      res.send({ gptResponse });
    } catch (error) {
      console.error("Error fetching smart contract source code:", error);
      res.status(500).send("Internal server error");
    }
  }
