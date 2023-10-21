import React, { useEffect, useState } from "react";
import { Button, Textarea } from "flowbite-react";
import { useParams } from "react-router-dom";
import axios from "axios";
import generatePDF, { Resolution, Margin } from "react-to-pdf";

function ClarityAudit() {
  const [codeData, setCodeData] = useState("");
  const [audit, setAudit] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAudit = async () => {
    setLoading(true);
    console.log("Fetching data...");
    try {
      // Make POST request to backend
      const response = await axios.post(
        "http://localhost:3001/getAuditReport",
        {
          contractCode: codeData,
        }
      );
      setAudit(response.data.gptResponse.choices[0].message.content);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const options = {
    resolution: Resolution.HIGH,
    page: {
      // margin is in MM, default is Margin.NONE = 0
      margin: Margin.SMALL,
    },
  };

  const getTargetElement = () => document.getElementById("content-id");

  return (
    <div>
      <div className="bg-teal-100 min-h-screen py-8">
        <div className="container mx-auto">
          <h1 className="text-4xl font-custom text-center mb-8 text-teal-500">
            Clarity Audit
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 ml-5 mr-5">
            <div className="bg-white p-4 rounded shadow-md ">
              <h2 className="text-xl font-semibold mb-4 text-teal-500">
                Clarity Smart Contract Code
              </h2>
              <Textarea
                id="code"
                placeholder="Write your code here..."
                required
                rows={20}
                value={codeData}
                onChange={(e) => setCodeData(e.target.value)}
              />
              <div className="flex justify-end">
                <Button
                  onClick={handleAudit}
                  className="deploy-button font-bold mt-3 px-3 py-1 bg-amber-500 text-white rounded "
                >
                  Submit
                </Button>
              </div>
            </div>
            <div className="bg-white p-4 rounded shadow-md">
              <h2 className="text-xl font-semibold mb-4 w-full text-teal-500">Audit</h2>
              {loading ? (
                <>
                  {audit ? (
                    <>
                      <div id="content-id">
                        <p className="break-words w-full whitespace-pre-wrap ">
                          {audit}
                        </p>
                      </div>
                      <div className="flex justify-end">
                        <Button
                          onClick={() => generatePDF(getTargetElement, options)}
                          className="deploy-button font-bold mt-3 px-6 py-2 bg-amber-500 text-white rounded "
                        >
                          Download PDF
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-center mt-20">
                        Audit loading...
                      </div>
                    </>
                  )}
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClarityAudit;
