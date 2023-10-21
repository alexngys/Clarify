import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';  // Import axios

const app = express();

// Use body-parser middleware to handle JSON input
app.use(bodyParser.json());

// Define the /clarify endpoint
app.post('/clarify', async (req, res) => {  // Make the callback async
    const contractId = req.body.contractId;

    // Split the contract id into address and name
    const [contractAddress, contractName] = contractId.split('.');
    
    if (!contractAddress || !contractName) {
        res.status(400).send('Invalid contract ID format. Expected format: {contract address}.{contract name}');
        return;
    }
    
    try {
        // Construct the URL for the Hiro API endpoint
        const url = `https://api.mainnet.hiro.so/v2/contracts/source/${contractAddress}/${contractName}?proof=0`;

        // Send a GET request to the Hiro API
        const response = await axios.get(url);
        console.log('Hiro API response:', response.data);

        // Log the source code to the console
        console.log('Smart Contract Source Code:', response.data);

        const sourceCode = response.data;
        console.log('Smart Contract Source Code:', sourceCode);

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

        // You can also send the source code back in the response if desired
        res.send(prompt);

    } catch (error) {
        console.error('Error fetching smart contract source code:', error);
        res.status(500).send('Internal server error');
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
