import { Greetings } from "./components/Greeting";
import React, { useEffect, useState } from "react";
import greetings from "./abi/greetings.json";
import Web3 from "web3";
function App() {
 
  return (
    <>
      <Greetings />
    </>
  );
}

export default App;
