import React from "react";
import { Tabs } from "flowbite-react";

function Home() {
  return (
    <div className="flex flex-col items-center justify-start h-screen text-center bg-gradient-to-r from-blue-200 to-blue-300">
      {/* Even Larger Bold Centered Title */}
      <h1 className="text-8xl font-bold mb-8 mt-8 text-white">CLARIFY</h1>

      <Tabs.Group aria-label="Clarify tabs" style="default" className="justify-center">
        {/* Clarity Tab */}
        <Tabs.Item
          active
          title="Clarity"
        >
          <p className="mx-auto">
            This is
            <span className="font-medium text-gray-800 dark:text-white">
              Clarity tab's associated content
            </span>
            .
            Clicking the other tab will toggle the visibility of this one. The tab JavaScript swaps classes to
            control the content visibility and styling.
          </p>
          {/* Input box beneath Clarity Tab */}
          <input
            placeholder="Enter your address here..."
            className="mt-4 px-4 py-3 border rounded placeholder-gray-500 text-lg w-2/4 h-12 resize-y"
          ></input>
          {/* Submit button below the input box */}
          <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded">Submit</button>
        </Tabs.Item>

        {/* Solidity Tab */}
        <Tabs.Item
          title="Solidity"
        >
          <p className="mx-auto">
            This is
            <span className="font-medium text-gray-800 dark:text-white">
              Solidity tab's associated content
            </span>
            .
            Clicking the other tab will toggle the visibility of this one. The tab JavaScript swaps classes to
            control the content visibility and styling.
          </p>
          {/* Input box beneath Solidity Tab */}
          <input
            placeholder="Enter your address here..."
            className="mt-4 px-4 py-3 border rounded placeholder-gray-500 text-lg w-3/4 h-12 resize-y"
          ></input>
          {/* Submit button below the input box */}
          <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded">Submit</button>
        </Tabs.Item>
      </Tabs.Group>
    </div>
  );
}

export default Home;
