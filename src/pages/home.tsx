import React from "react";
import { Tabs } from "flowbite-react";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* Large Bold Centered Title */}
      <h1 className="text-4xl font-bold mb-8">Clarify</h1>

      <Tabs.Group aria-label="Clarify tabs" style="default">
        {/* Clarity Tab */}
        <Tabs.Item
          active
          title="Clarity"
        >
          <p>
            This is
            <span className="font-medium text-gray-800 dark:text-white">
              Clarity tab's associated content
            </span>
            .
            Clicking the other tab will toggle the visibility of this one. The tab JavaScript swaps classes to
            control the content visibility and styling.
          </p>
        </Tabs.Item>

        {/* Solidity Tab */}
        <Tabs.Item
          title="Solidity"
        >
          <p>
            This is
            <span className="font-medium text-gray-800 dark:text-white">
              Solidity tab's associated content
            </span>
            .
            Clicking the other tab will toggle the visibility of this one. The tab JavaScript swaps classes to
            control the content visibility and styling.
          </p>
        </Tabs.Item>
      </Tabs.Group>
    </div>
  );
}

export default Home;
