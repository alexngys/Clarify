import { JsonRpcSigner } from "@ethersproject/providers"
import { ethers } from "ethers";
const solc = require('solc');

function compileProxyContract(sourceCode: string) {
    // Compile the source code
    const input = {
        language: 'Solidity',
        sources: {
            'ClarityEquivalent.sol': {
                content: sourceCode
            }
        },
        settings: {
            outputSelection: {
                '*': {
                    '*': ['*']
                }
            }
        }
    };

    const output = JSON.parse(solc.compile(JSON.stringify(input)));

    if (output.errors) {
        console.error('Compilation errors:', output.errors);
        return null;
    }

    const contract = output.contracts['ClarityEquivalent.sol']['ClarityEquivalent'];
    return {
        abi: contract.abi,
        bytecode: contract.evm.bytecode.object
    };
}

export async function deployToEthereum(signer: JsonRpcSigner, solidityCode: string) {
    const compiledContract = compileProxyContract(solidityCode);
    if (!compiledContract) {
        console.error('Compilation failed.');
        return;
    }

    const { abi, bytecode } = compiledContract;

    try {
        // Create a ContractFactory instance
        const contractFactory = new ethers.ContractFactory(abi, bytecode, signer as any);

        // Deploy the contract
        const contract = await contractFactory.deploy();

        console.log('Contract deployed to address:', contract.target);

        // Optionally wait for the contract to be mined
        await (contract as any).deployTransaction.wait();
        console.log('Deployment confirmed.');

    } catch (error) {
        console.error('Deployment failed:', error);
    }
}