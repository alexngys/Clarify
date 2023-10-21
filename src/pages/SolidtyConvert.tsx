import React from "react";
import { Button } from "flowbite-react";
import { useParams } from "react-router-dom";
import { Web3Provider } from "@ethersproject/providers";


// TypeScript type assertion
declare global {
  interface Window {
    ethereum: any;
  }
}

function SolidtyConvert() {
  let { clarityAddress } = useParams();
  const apikey = process.env.REACT_APP_OPENAI_API_KEY;

  // Handle Deploy function
  const handleDeploy = async () => {
    // Check if MetaMask is installed
    if (window.ethereum) {
      try {
        const provider = new Web3Provider(window.ethereum);

        // Request account access
        const signer = provider.getSigner();
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        console.log("Connected to account:", account);

        // Here you would add the logic to deploy the contract using ethers.js
        // ...

      } catch (error) {
        console.error("User rejected access or there was an error:", error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  }

  return (
    <div>
      <div className="bg-gradient-to-r from-teal-300 to-teal-500 min-h-screen py-8">
        <div className="container mx-auto">
          <h1 className="text-4xl font-custom text-center mb-8 text-white">
            Clarity Smart Contract Address: {clarityAddress}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 ml-5 mr-5">
            <div className="bg-white p-4 rounded shadow-md">
              <h2 className="text-xl font-semibold mb-4">
                Clarity Smart Contract Code
              </h2>
              <pre>
                <code className="language-javascript">
                  {`function greet() {
  console.log("Hello, World!");
}`}
                </code>
              </pre>
            </div>
            <div className="bg-white p-4 rounded shadow-md">
              <h2 className="text-xl font-semibold mb-4">
                Solidty Smart Contract Code
              </h2>
              <pre>
                <code className="language-javascript">
                  {`function add(a, b) {
  return a + b;
}`}
                </code>
              </pre>
            </div>
          </div>
          <Button 
    onClick={handleDeploy}
    className="deploy-button font-bold mt-2 px-6 py-2 bg-amber-500 text-white rounded ml-[70%]">
    DEPLOY
</Button>
        </div>
      </div>
    </div>
  );
}

export default SolidtyConvert;
