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

export function generateAuditPrompt(sourceCode: string) {
  const prompt = `
        Analyze the following Stacks Clarity smart contract code for vulnerabilities, security risks, efficiency, and adherence to best practices. Provide a professional, in-depth audit report detailing any issues found, along with recommendations for mitigating these issues. Include an executive summary, detailed findings, and conclusion. 

        Contract Source Code:
        \`\`\`
        ${sourceCode}
        \`\`\`

        Some specific areas to focus on include:
        Code correctness and functionality: Ensure the code functions as intended and check for any logical or arithmetic errors.
        Security: Look for common vulnerabilities such as re-entrancy attacks, integer overflow, and improper access control.
        Efficiency: Evaluate the code for any inefficiencies and suggest optimizations to reduce gas costs and improve performance.
        Code readability and maintainability: Assess the code structure, commenting, and naming conventions for clarity and ease of maintenance.
        Compliance with Stacks and Clarity best practices: Verify adherence to recommended coding standards and practices for Stacks Clarity smart contracts.
        Error handling: Examine the code for appropriate error handling and fail-safe mechanisms.

        Please provide a line-by-line analysis where necessary, and suggest specific code modifications to address any issues identified.
    `;
  return prompt;
}
