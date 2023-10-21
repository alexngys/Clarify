import React, { useState } from "react";
import { Button, Tabs, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [clarityField, setClarityField] = useState("");

  return (
    <div className="flex flex-col items-center justify-start h-screen text-center bg-gradient-to-r from-teal-200 to-teal-500">
      {/* Even Larger Bold Centered Title */}
      <h1 className="text-8xl font-custom mb-8 mt-8 text-white">CLARIFY</h1>

      <Tabs.Group
        aria-label="Clarify tabs"
        style="default"
        className="justify-center"
      >
        {/* Clarity Tab */}
        <Tabs.Item active title="Clarity">
          <div className="flex flex-col justify-center items-center">
            <p className="mx-auto text-white">
              This is 
              <span className="font-default text-gray-800 text-white">
                Clarity tab's associated content
              </span>
              . Clicking the other tab will toggle the visibility of this one.
              The tab JavaScript swaps classes to control the content visibility
              and styling.
            </p>
            {/* Input box beneath Clarity Tab */}
            <TextInput
              placeholder="Enter your smart contract address here..."
              className="mt-4 px-4 py-3  rounded placeholder-gray-500 text-lg w-2/4 h-12 resize-y"
              value={clarityField}
              onChange={(e) => setClarityField(e.target.value)}
            ></TextInput>
            {/* Submit button below the input box */}
            <Button
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded"
              onClick={() => navigate(`/ClarityConvert/${clarityField}`)}
            >
              Submit
            </Button>
          </div>
        </Tabs.Item>

        {/* Solidity Tab */}
        <Tabs.Item title="Solidity">
          <div className="flex flex-col justify-center">
            <p className="mx-auto">
              This is
              <span className="font-default text-gray-800 dark:text-white">
                Solidity tab's associated content
              </span>
              . Clicking the other tab will toggle the visibility of this one.
              The tab JavaScript swaps classes to control the content visibility
              and styling.
            </p>
            {/* Input box beneath Solidity Tab */}
            <TextInput
              placeholder="Enter your smart contract address here..."
              className="mt-4 px-4 py-3  rounded placeholder-gray-500 text-lg w-3/4 h-12 resize-y"
            ></TextInput>
            {/* Submit button below the input box */}
            <Button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded">
              Submit
            </Button>
          </div>
        </Tabs.Item>
      </Tabs.Group>
    </div>
  );
}

export default Home;
