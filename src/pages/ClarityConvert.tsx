import React from "react";
import { Button } from "flowbite-react";
import { useParams } from "react-router-dom";

function ClarityConvert() {
  let { clarityAddress } = useParams();
  const apikey = process.env.REACT_APP_OPENAI_API_KEY;

  return (
    <div>
      <div className="bg-gradient-to-r from-blue-200 to-blue-300 min-h-screen py-8">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold text-center mb-8">
            Clarity Smart Contract Address: {clarityAddress}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
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
              <h2 className="text-xl font-semibold mb-4">Explanation</h2>
              <pre>
                <code className="language-javascript">
                  {`function add(a, b) {
  return a + b;
}`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClarityConvert;
