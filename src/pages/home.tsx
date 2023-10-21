import React, { useState } from "react";
import { Button, Tabs, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [clarityField, setClarityField] = useState("");

  return (
    <div className="flex flex-col items-center justify-start h-screen text-center bg-teal-100">
      
      {/* Title */}
      <h1 className="text-8xl font-custom mb-8 mt-8 text-teal-500">CLARIFY</h1>

      {/* Tabs */}
      <Tabs.Group aria-label="Clarify tabs" style="underline" className="justify-center border-t border-b border-teal-300">
        
        {/* Clarity Tab */}
        <Tabs.Item active title="Clarity Breakdown">
          <div className="flex flex-col justify-center items-center">
            <p className="font-bold mx-auto">
              Enter your Clarity smart contract address and generate an explanation of the smart contract code
            </p>

            {/* Input box */}
            <TextInput
              placeholder="Enter your smart contract address here..."
              className="mt-4 px-4 py-3  rounded placeholder-teal-500 text-lg w-[500px] h-12 resize-y"
              value={clarityField}
              onChange={(e) => setClarityField(e.target.value)}
            ></TextInput>
            
            {/* Submit button */}
            <Button
              className="font-bold mt-4 px-6 py-2 bg-amber-500 text-white rounded"
              onClick={() => navigate(`/ClarityBreakdown/${clarityField}`)}
            >
              SUBMIT
            </Button>
          </div>
        </Tabs.Item>

        {/* Solidity Tab */}
        <Tabs.Item active title="Clarity to Solidity Converter">
          <div className="flex flex-col justify-center items-center">
            <p className="font-bold mx-auto">
              Enter your Clarity smart contract address and generate an
              equivalent code in Solidty
            </p>
            {/* Input box beneath Clarity Tab */}
            <TextInput
              placeholder="Enter your smart contract address here..."
              className="mt-4 px-4 py-3  rounded placeholder-teal-500 text-lg w-[500px] h-12 resize-y"
              value={clarityField}
              onChange={(e) => setClarityField(e.target.value)}
            ></TextInput>
            {/* Submit button below the input box */}
            <Button
              className="font-bold mt-4 px-6 py-2 bg-amber-500 text-white rounded"
              onClick={() => navigate(`/SolidtyConvert/${clarityField}`)}
            >
              SUBMIT
            </Button>
          </div>
        </Tabs.Item>
        <Tabs.Item active title="Solidity to Clarity Converter">
          <div className="flex flex-col justify-center items-center">
            <p className="font-bold mx-auto">
              Enter your Solidity smart contract address and generate an
              equivalent code in Clarity
            </p>
            {/* Input box beneath Clarity Tab */}
            <TextInput
              placeholder="Enter your smart contract address here..."
              className="mt-4 px-4 py-3  rounded placeholder-teal-500 text-lg w-[500px] h-12 resize-y"
              value={clarityField}
              onChange={(e) => setClarityField(e.target.value)}
            ></TextInput>
            {/* Submit button below the input box */}
            <Button
              className="font-bold mt-4 px-6 py-2 bg-amber-500 text-white rounded"
              onClick={() => navigate(`/ClarityConvert/${clarityField}`)}
            >
              SUBMIT
            </Button>
          </div>
        </Tabs.Item>
        <Tabs.Item active title="Clarity Contract auditing">
          <div className="flex flex-col justify-center items-center">
            <p className="font-bold mx-auto">
              Audit your Clarity smart contract code to check for potential
              security vulnerabilities, errors and general code quality.
            </p>
            {/* Input box beneath Clarity Tab */}
            <Button
              className="font-bold mt-4 px-6 py-2 bg-amber-500 text-white rounded"
              onClick={() => navigate(`/ClarityAudit`)}
            >
              GO TO AUDIT
            </Button>
          </div>
        </Tabs.Item>
      </Tabs.Group>
    </div>
  );
}

export default Home;
