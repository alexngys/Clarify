import React from "react";
import { Button } from "flowbite-react";
import { useParams } from "react-router-dom";

function ClarityConvert() {
  let { clarityAddress } = useParams();
  const apikey = process.env.REACT_APP_OPENAI_API_KEY;

  return (
    <div>
      <h1 className="">Welcome to my website!</h1>
      <h2>{clarityAddress}</h2>
      <h2>hey:{apikey}</h2>
      <Button>Click me</Button>
    </div>
  );
}

export default ClarityConvert;
