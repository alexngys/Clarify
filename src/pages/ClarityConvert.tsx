import React, { useEffect, useState } from "react";
import { Button, Toast } from "flowbite-react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Web3Provider } from "@ethersproject/providers";
import { deployToEthereum } from "../utils/deployToEthereum";
import { ethers } from "ethers";

// TypeScript type assertion
declare global {
  interface Window {
    ethereum: any;
  }
}

function ClarityConvert() {
  let { clarityAddress } = useParams();

  const [codeData, setCodeData] = useState(null);
  const [solidityCode, setSolidityCode] = useState(null);
  const [explanation, setExplanation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [broadcastSuccess, setBroadcastSuccess] = useState<string | null>(null);

  // Handle Deploy function
  const handleDeploy = async () => {
    // Check if MetaMask is installed
    setLoading(true);
    if (window.ethereum) {
      try {
        const provider = new Web3Provider(window.ethereum);

        // Request account access
        const signer = provider.getSigner();
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = accounts[0];
        console.log("Connected to account:", account);

        if (solidityCode) {
          const privateKey = process.env.REACT_APP_PRIVATE_KEY;
          const provider = new ethers.InfuraProvider(
            "sepolia",
            "935538f6574f4f99b4a6b83b182010bf",
            "fc907599617b4e58957043073dd24cc4"
          );

          const wallet = new ethers.Wallet(privateKey!, provider);

          const response = await axios.post(
            "http://localhost:3001/compileContract",
            {
              contractCode: solidityCode,
            }
          );

          const contractFactory = new ethers.ContractFactory(
            response.data.abi,
            response.data.bytecode,
            wallet
          );

          // Deploy the contract
          const deploymentTransaction =
            await contractFactory.getDeployTransaction();
          const txResponse = await wallet.sendTransaction(
            deploymentTransaction
          );

          // Wait for the transaction to be mined and get the receipt
          const receipt = await txResponse.wait();

          // Check if 'receipt' is null or undefined
          if (!receipt) {
            throw new Error(
              "Transaction receipt is null. Deployment might have failed."
            );
          }

          // The contract address is available in the receipt
          const contractAddress = receipt.contractAddress || "0x0";
          setLoading(false);
          setBroadcastSuccess(contractAddress);
          console.log("Contract Address: ", contractAddress);
        } else {
          alert("Please wait for the code to load!");
        }
      } catch (error) {
        console.error("User rejected access or there was an error:", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data whoopyyyy...");
      console.log(`address: ${clarityAddress}`);
      try {
        // Make POST request to backend
        const response = await axios.post(
          "http://localhost:3001/convertToSolidity",
          {
            contractId: clarityAddress,
          }
        );
        // Assume the response data structure is as follows:
        // { sourceCodeData: { source: '...' }, gptResponse: { choices: [{ text: '...' }] } }
        // Update state with data from backend
        setCodeData(response.data.sourceCodeData.source);
        setSolidityCode(response.data.solidityCode);
        setExplanation(response.data.explanation);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="bg-teal-100 min-h-screen py-8">
        <div className="container mx-auto">
          <h1 className="text-4xl font-custom text-center mb-8 text-teal-500">
            Clarity Smart Contract Address: {clarityAddress}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 ml-5 mr-5">
            <div className="bg-white p-4 rounded shadow-md">
              <h2 className="text-xl font-semibold mb-4">
              Clarity Smart Contract Code
              </h2>
              <pre className="overflow-auto">
                {codeData || "Loading code..."}
              </pre>
            </div>
            <div className="bg-white p-4 rounded shadow-md">
              <h2 className="text-xl font-semibold mb-4">
              Solidity Smart Contract Code
              </h2>
              <pre className="overflow-auto">
                {solidityCode || "Loading code..."}
              </pre>
            </div>
          </div>
        </div>
        <div className=" my-4 mx-5">
          <div className="bg-white p-4 rounded shadow-md ">
            <div className="flex justify-between">
              <h2 className="text-2xl font-semibold mb-4 ">Explanation</h2>
              {broadcastSuccess ? (
                <Toast className="h-16">
                  <div className="ml-3 text-sm font-semibold break-all">
                    Contract Address: {broadcastSuccess}
                  </div>
                  <Toast.Toggle />
                </Toast>
              ) : (
                <></>
              )}
              {solidityCode ? (
                <Button
                  onClick={handleDeploy}
                  className="deploy-button font-bold mt-2 px-6  bg-amber-500 text-white rounded h-[64px]"
                >
                  {loading ? "Loading" : "Deploy Solidity Contract"}
                </Button>
              ) : (
                <></>
              )}
            </div>
            <p className="break-words whitespace-pre-wrap ">
              {explanation || "Loading explanation..."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClarityConvert;