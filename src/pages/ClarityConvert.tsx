import React, { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Web3Provider } from "@ethersproject/providers";

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
  const [broadcastSuccess, setBroadcastSuccess] = useState(false);

  // Handle Deploy function
  const handleDeploy = async () => {
    // Check if MetaMask is installed
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

        // Here you would add the logic to deploy the contract using ethers.js
        // ...
      } catch (error) {
        console.error("User rejected access or there was an error:", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data...");
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
      <div className="bg-gradient-to-r from-teal-300 to-teal-500 min-h-screen py-8">
        <div className="container mx-auto">
          <h1 className="text-4xl font-custom text-center mb-8 text-white">
            Solidty Smart Contract Address: {clarityAddress}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 ml-5 mr-5">
            <div className="bg-white p-4 rounded shadow-md">
              <h2 className="text-xl font-semibold mb-4">
                Solidty Smart Contract Code
              </h2>
              <pre className="overflow-auto">
                {codeData || "Loading code..."}
              </pre>
            </div>
            <div className="bg-white p-4 rounded shadow-md">
              <h2 className="text-xl font-semibold mb-4">
                Clarity Smart Contract Code
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
              <Button
                onClick={handleDeploy}
                className="deploy-button font-bold mt-2 px-6 py-2 bg-amber-500 text-white rounded "
              >
                DEPLOY
              </Button>
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
