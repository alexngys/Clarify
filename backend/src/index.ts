import express from 'express';
import bodyParser from 'body-parser';

const app = express();

// Use body-parser middleware to handle JSON input
app.use(bodyParser.json());

// Define the /clarify endpoint
app.post('/clarify', (req, res) => {
    const contractAddress = req.body.contractAddress;
    
    if (!contractAddress) {
        res.status(400).send('Contract address is required');
        return;
    }
    
    // TODO: Add logic to fetch smart contract source code, send to OpenAI, etc.
    
    res.send('Endpoint reached, contract address: ' + contractAddress);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
