import React from "react";
import { Button } from "flowbite-react";
import { useParams } from "react-router-dom";

function ClarityConvert() {
  let { clarityAddress } = useParams();
  return (
    <div>
      <h1 className="">Welcome to my website!</h1>
      <h2>{clarityAddress}</h2>
      <Button>Click me</Button>
    </div>
  );
}

export default ClarityConvert;
