import { getSourceCode } from "../utils/hiroAPIUtil";
import { getGPTResponse } from "../utils/openaiUtil";
import {
  generateClarifyPrompt,
  generateSolidityConvertPrompt,
  extractSolidityCodeAndExplanation,
  generateAuditPrompt,
} from "../utils/promptUtil";

export async function getContractAnalysis(req, res) {
  const contractId = req.body.contractId;
  const [contractAddress, contractName] = contractId.split(".");

  console.log("Endpoint hit");

  if (!contractAddress || !contractName) {
    res
      .status(400)
      .send(
        "Invalid contract ID format. Expected format: {contract address}.{contract name}"
      );
    return;
  }

  try {
    const sourceCodeData = await getSourceCode(contractAddress, contractName);
    const prompt = generateClarifyPrompt(sourceCodeData.source);
    const gptResponse = await getGPTResponse(prompt);
    res.send({ sourceCodeData, gptResponse });
  } catch (error) {
    console.error("Error fetching smart contract source code:", error);
    res.status(500).send("Internal server error");
  }
}

export async function convertToSolidity(req, res) {
  const contractId = req.body.contractId;
  const [contractAddress, contractName] = contractId.split(".");

  if (!contractAddress || !contractName) {
    res
      .status(400)
      .send(
        "Invalid contract ID format. Expected format: {contract address}.{contract name}"
      );
    return;
  }

  try {
    const sourceCodeData = await getSourceCode(contractAddress, contractName);
    const prompt = generateSolidityConvertPrompt(sourceCodeData.source);
    const gptResponse = await getGPTResponse(prompt);

    console.log(gptResponse.choices[0].message.content);

    const { solidityCode, explanation } = extractSolidityCodeAndExplanation(
      gptResponse.choices[0].message.content
    );

    res.send({ sourceCodeData, solidityCode, explanation });
  } catch (error) {
    console.error("Error fetching smart contract source code:", error);
    res.status(500).send("Internal server error");
  }
}

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
