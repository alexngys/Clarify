import express from 'express';
import bodyParser from 'body-parser';

const app = express();

// Use body-parser middleware to handle JSON input
app.use(bodyParser.json());

// Define the /clarify endpoint
app.post('/clarify', (req, res) => {
    const contractId = req.body.contractId;

    // Split the contract id into address and name
    const [contractAddress, contractName] = contractId.split('.');
    
    if (!contractId) {
        res.status(400).send('Contract address is required');
        return;
    }
    
    // TODO: Add logic to fetch smart contract source code, send to OpenAI, etc.

    res.send(`Endpoint reached.\nContract address: ${contractAddress}\nContract name: ${contractName}`);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
