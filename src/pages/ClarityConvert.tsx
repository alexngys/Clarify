import React, { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ClarityConvert() {
  let { clarityAddress } = useParams();
  const [codeData, setCodeData] = useState(null);
  const [explanation, setExplanation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data...");
      try {
        // Make POST request to backend
        const response = await axios.post("http://localhost:3001/clarify", {
          contractId: clarityAddress,
        });
        // Assume the response data structure is as follows:
        // { sourceCodeData: { source: '...' }, gptResponse: { choices: [{ text: '...' }] } }
        // Update state with data from backend
        setCodeData(response.data.sourceCodeData.source);
        setExplanation(response.data.gptResponse.choices[0].message.content);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  console.log("clarityAddress:", clarityAddress);

  return (
    <div>
      <div className="bg-gradient-to-r from-teal-300 to-teal-500 min-h-screen py-8">
        <div className="container mx-auto">
          <h1 className="text-4xl font-custom text-center mb-8 text-white">
            Clarity Smart Contract Address: {clarityAddress}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 ml-5 mr-5">
            <div className="bg-white p-4 rounded shadow-md ">
              <h2 className="text-xl font-semibold mb-4">
                Clarity Smart Contract Code
              </h2>
              <pre className="overflow-auto">
                {codeData || "Loading code..."}
              </pre>
            </div>
            <div className="bg-white p-4 rounded shadow-md">
              <h2 className="text-xl font-semibold mb-4 w-full">Explanation</h2>

              <p className="break-normal w-full">
                {explanation || "Loading explanation..."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClarityConvert;
