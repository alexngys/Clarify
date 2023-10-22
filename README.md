# About Clarify
Clarify is an innovative toolbox harnessing the power of OpenAI to streamline blockchain development. It offers a suite of functionalities tailored for developers working with Solidity and Clarity (Stacks). At its core, Clarify allows seamless conversion between Solidity and Clarity code, enabling effortless deployment on their respective platforms. Beyond simple conversion, our tool provides an AI-driven audit feature for Clarity code, ensuring robustness and security in smart contract deployments. Furthermore, Clarify demystifies the complexities of Clarity code with its AI-powered explanation module, making the codebase more accessible to both seasoned and novice developers. In essence, Clarify is a one-stop-shop for enhancing blockchain development efficiency, security, and understanding




# Getting Started with Clarify
## Setting up Clarify
1. Clone repo
2. Run `npm install` in main folder
3. Set up .env.local file in main folder with OPENAI key and etherscan key:
```
REACT_APP_OPENAI_API_KEY=XXXXXXXXXXXXXXXX
ETHERSCAN_API_KEY=XXXXXXXXXXXXXXXX
```
4. `cd` into backend and run `npm install`
5. Run `npm install -g nodemon` to install nodemon globally
6. Set up .env file in backend folder with Ethereum priv_key
```
REACT_APP_PRIVATE_KEY=XXXXXXXXXXXXXXXX
```
7. Run `npm run start` in backend folder
8. Start a seperate terminal
9. `cd..` into main folder
10. Run `npm start` in main folder

## Running Clarify
1. `cd` into backend 
2. Run `npm run start` in backend folder
8. Start a seperate terminal
9. `cd..` into main folder
4. Run `npm start` in main folder


# Technical Overview:
The project, named Clarify, serves as a bridge between developers and the Stacks blockchain, allowing for the analysis, programming language conversion and deployment, and auditing of smart contracts. It provides a user-friendly interface for entering a smart contract address, and performing various operations such as breaking down the code, converting between Clarity (Stacks) / Solidity (Ethereum) code and deploying to either chains, and auditing Clarity contracts.

## How does it work?
1. AI-driven smart contract explanations
Users enter an address of a Clarity smart contract deployed to the Stacks blockchain. This triggers one of Clarify's endpoints, `POST /clarify`, which takes the contract address in the request body. A request is made to the Hiro API to retrieve the Clarity smart contract code associated with the address provided. A prompt is then constructed with the smart contract code to explain in detail what the contract does and how to interact with it. This is then passed to openAI's api using the GPT-4 model. The response of this query is then passed back to the UI where the code explanation is displayed alongside the smart contract code

2.1. Conversion and deployment from Clarity to Solidity
Users enter the address of a clarity smart contract address deployed to the Stacks blockchain. This triggers another on of Clarify's endpoints, `POST /convertToSolidity`, which takes the contract address in the request body. Again, a request is made to the Hiro API to retrieve the Clarity smart contract code associated with the address provided. A carefully contructed prompt is then generated with the smart contract code in order to convert the clarity code to solidity, and going through the changes made due to differing functionality. This is then passed to openAI's api using the GPT-4 model. The response of this query is then passed back to the UI where the Clarity code is displayed alongside the converted Solidity code, and a explanation of the conversion and the contract below. 

Significantly, there is also a deploy button, this will prompt the user to conect their metamask wallet, then the Clarify endpoint `POST /compileContract` will be hit with the solidity code in the request body. This endpoint will compile the solidity code and return the abi and bytecode. From there, within utils scripts in the frontend the smart contract will be deployed to ETH Sepolia and the contract address will be displayed in the UI.

2.1. Conversion and deployment from Solidity to Clarity
Users enter the address of a solidity smart contract address deployed to ETH sepolia. This triggers another on of Clarify's endpoints, `POST /convertToClarity`, which takes the contract address in the request body. A request is made to the eth sepolia API to retrieve the solidity smart contract source code associated with the address provided. A carefully contructed prompt is then generated with the smart contract code in order to convert the solidity code to clarity, and going through the changes made due to differing functionality. This is then passed to openAI's api using the GPT-4 model. The response of this query is then passed back to the UI where the Solidity code is displayed alongside the converted Clarity code, and a explanation of the conversion and the contract below. 

Again, there is also a deploy button, this will run the script deployToStacks.ts in the utils folder. This script takes the clarity smart contract code as input, generates a deployment transaction, and broadcasts the transaction to the Stacks testnet. This is currently done with a prefunded stacks address. The transactionID of the deployment is then returned and displayed on the UI

3. AI-powered clarity smart contract auditing
Users enter their Clarity smart contract code into the UI, and hit the 'Audit' button. This sends a POST request to the Clarify endpoint `/getAuditReport` which takes the smart contract code in the request body. A prompt is then carefully constructed in order to give the most in-depth audit report. This is then passed to openAI's api using the GPT-4 model. GPT-4 does a very good job of auditing clarity code, however it is important to note that this SHOULD NOT be a developers sole testing/auditing technique. This audit report response is then return to the UI where it is displayed alongside the code. There is also a 'download pdf' button, this downloads the audit report as a pdf for you, useful for sharing the audit report if the code is a collaborative project within a team.
