export function generateClarifyPrompt(sourceCode: string) {
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
        - Add newline characters (\\n) to separate each section of your response.
    `;
  return prompt;
}

export function generateSolidityConvertPrompt(sourceCode: string) {
  const prompt = `
        Title: Clarity to Solidity Code Conversion

        Description: 
        Convert the provided Clarity smart contract code to its equivalent in Solidity, ensuring that the functionality remains consistent across both versions. Translate the logic, functions, and data structures from Clarity to Solidity while preserving the original intent and behavior of the contract.
        Call the solidity contract "ClarityEquivalent", add // SPDX-License-Identifier: MIT, and use the solidity compiler version 0.8.21

        Clarity Code:
        \`\`\`
        ${sourceCode}
        \`\`\`

        Instructions:
        1. Identify and translate data types from Clarity to their Solidity counterparts.
        2. Convert Clarity functions to Solidity functions, ensuring that visibility and mutability are appropriately set.
        3. Translate any contract storage variables and structures, preserving their relationships and accessibility.
        4. Ensure that any contract-level logic is preserved and functional in the Solidity version.
        5. Comment on any significant differences or considerations that arise from translating between these two smart contract languages.
        6. Provide a brief explanation for each function's purpose and any modifications made during translation.
    `;
  return prompt;
}

export function generateClarityConvertPrompt(sourceCode: string) {
  const prompt = `
        Title: Solidity to Clarity Code Conversion

        Description: 
        Convert the provided Solidity smart contract code to its equivalent in Clarity, ensuring that the functionality remains consistent across both versions. Translate the logic, functions, and data structures from Solidity to Clarity while preserving the original intent and behavior of the contract.
        
        Solidity Code:
        \`\`\`
        ${sourceCode}
        \`\`\`

        Instructions:
        1. Identify and translate data types from Solidity to their Clarity counterparts.
        2. Convert Solidity functions to Clarity functions, ensuring that visibility and mutability are appropriately set.
        3. Translate any contract storage variables and structures, preserving their relationships and accessibility.
        4. Ensure that any contract-level logic is preserved and functional in the Clarity version.
        5. Comment on any significant differences or considerations that arise from translating between these two smart contract languages.
        6. Provide a brief explanation for each function's purpose and any modifications made during translation.
    `;
  return prompt;
}

export function extractSolidityCodeAndExplanation(response: string): {
  solidityCode: string;
  explanation: string;
} {
  // Find the indices of the Solidity code block
  const codeBlockStart = response.indexOf("```solidity");
  const codeBlockEnd = response.indexOf(
    "```",
    codeBlockStart + "```solidity".length - 1
  );

  if (codeBlockStart === -1 || codeBlockEnd === -1) {
    throw new Error("Solidity code block not found");
  }

  // Extract the Solidity code
  const solidityCode = response
    .substring(codeBlockStart + "```solidity".length, codeBlockEnd)
    .trim();

  // Get everything after the Solidity code block
  const explanation = response.substring(codeBlockEnd + "```".length).trim();

  return { solidityCode, explanation };
}

export function extractClarityCodeAndExplanation(response: string): {
  clarityCode: string;
  explanation: string;
} {
  // Find the indices of the Clarity code block
  const codeBlockStart = response.indexOf("```");
  const codeBlockEnd = response.indexOf(
    "```",
    codeBlockStart + "```".length - 1
  );

  if (codeBlockStart === -1 || codeBlockEnd === -1) {
    throw new Error("Clarity code block not found");
  }

  // Extract the Clarity code
  const clarityCode = response
    .substring(codeBlockStart + "```".length, codeBlockEnd)
    .trim();

  // Get everything after the Clarity code block
  const explanation = response.substring(codeBlockEnd + "```".length).trim();

  return { clarityCode, explanation };
}

export function generateAuditPrompt(sourceCode: string) {
  const prompt = `
          Analyze the following Stacks Clarity smart contract code for vulnerabilities, security risks, efficiency, and adherence to best practices. Provide a professional, in-depth audit report detailing any issues found, along with recommendations for mitigating these issues. Include an executive summary, detailed findings, and conclusion. 
  
          Contract Source Code:
          \`\`\`
          ${sourceCode}
          \`\`\`

          Instructions:
          1. Identify and translate data types from Solidity to their Clarity counterparts.
          2. Convert Solidity functions to Clarity functions, ensuring that visibility and mutability are appropriately set.
          3. Translate any contract storage variables and structures, preserving their relationships and accessibility.
          4. Ensure that any contract-level logic is preserved and functional in the Clarity version.
          5. Comment on any significant differences or considerations that arise from translating between these two smart contract languages.
          6. Provide a brief explanation for each function's purpose and any modifications made during translation.
      `;
  return prompt;
}
